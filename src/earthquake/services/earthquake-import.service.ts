import fs from 'fs';
import csvParser from 'csv-parser';
import axios from 'axios';
import path from 'path';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';

import { Earthquake } from '../../earthquake/entities/earthquake.entity';
import {
  EarthquakeCsvRow,
  EarthquakeCsvRowCreateOption,
} from '../dto/earthquake-csv-row';
import { ImportEarthquakeInput } from '../dto/earthquake-import.input';
import { ImportEarthquakesOutput } from '../dto/earthquake-import.output';
import { EarthquakeCsvRowOutput } from '../dto/earthquake-csv-row.output';
import { staticConfig } from '../../config/static-config';
import logger from '../../utils/logger';

const { batchSize } = staticConfig.import;

@Service()
export class EarthquakeImportService {
  constructor(
    @InjectRepository(Earthquake)
    private readonly earthquakeRepo: Repository<Earthquake>,
  ) {}

  public async importEarthquakes(
    input: ImportEarthquakeInput,
  ): Promise<ImportEarthquakesOutput> {
    try {
      const filePath = await this.downloadFile(input.fileUrl);
      await this.validateCsvHeaders(filePath, this.expectedHeaders);
      const result = await this.processCsv(filePath);
      fs.unlinkSync(filePath);
      return result;
    } catch (error) {
      logger.error(
        `Failed to import earthquakes: ${this.getErrorMessage(error)}`,
      );
      throw new Error(
        `Failed to import earthquakes: ${this.getErrorMessage(error)}`,
      );
    }
  }

  private get expectedHeaders(): string[] {
    return [
      'DateTime',
      'Latitude',
      'Longitude',
      'Depth',
      'Magnitude',
      'MagType',
      'NbStations',
      'Gap',
      'Distance',
      'RMS',
      'Source',
      'EventID',
    ];
  }

  /**
   * Downloads the CSV file from the specified URL.
   * @param fileUrl - The URL of the CSV file.
   * @returns The path to the downloaded file.
   */
  private async downloadFile(fileUrl: string): Promise<string> {
    const filePath = path.resolve(__dirname, 'downloaded.csv');
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filePath));
      writer.on('error', (error) =>
        reject(
          new Error(`Failed to download file: ${this.getErrorMessage(error)}`),
        ),
      );
    });
  }

  /**
   * Validates the CSV headers against the expected headers.
   * @param filePath - The path to the CSV file.
   * @param expectedHeaders - The expected CSV headers.
   * @throws Error if required headers are missing or there is a validation error.
   */
  private async validateCsvHeaders(
    filePath: string,
    expectedHeaders: string[],
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath).pipe(csvParser());

      stream.on('headers', (headers) => {
        const missingHeaders = expectedHeaders.filter(
          (header) => !headers.includes(header),
        );

        if (missingHeaders.length > 0) {
          stream.destroy();
          reject(
            new Error(`Missing required headers: ${missingHeaders.join(', ')}`),
          );
        }

        resolve();
      });

      stream.on('error', (error) =>
        reject(
          new Error(
            `Failed to validate CSV headers: ${this.getErrorMessage(error)}`,
          ),
        ),
      );
    });
  }

  /**
   * Processes the CSV file by validating and importing rows in batches.
   * @param filePath - The path to the CSV file.
   * @returns An object containing the import results.
   */
  private async processCsv(filePath: string): Promise<ImportEarthquakesOutput> {
    const invalidRows: EarthquakeCsvRowOutput[] = [];
    let rows: EarthquakeCsvRow[] = [];
    let totalImportedCount = 0;
    let processedRowsCount = 0;

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath).pipe(csvParser());

      stream.on('data', (row: EarthquakeCsvRowCreateOption) => {
        processedRowsCount++;
        const record = EarthquakeCsvRow.createFromCsv(row);
        rows.push(record);
      });

      stream.on('end', async () => {
        logger.info(`Total processed rows: ${processedRowsCount}`);
        try {
          const { validRows, invalidRows: newInvalidRows } =
            await this.validateRows(rows);
          invalidRows.push(...newInvalidRows);
          totalImportedCount = await this.processBatches(validRows, batchSize);
        } catch (error) {
          logger.error(`Failed to process CSV: ${this.getErrorMessage(error)}`);
          reject(
            new Error(`Failed to process CSV: ${this.getErrorMessage(error)}`),
          );
          return;
        }

        logger.info(`Total imported count: ${totalImportedCount}`);
        logger.info(`Total invalid rows: ${invalidRows.length}`);

        resolve({
          totalImportedCount,
          failedImportCount: invalidRows.length,
          failedFields: invalidRows,
        });
      });

      stream.on('error', (error) =>
        reject(
          new Error(`Failed to read CSV file: ${this.getErrorMessage(error)}`),
        ),
      );
    });
  }

  /**
   * Validates the CSV rows.
   * @param rows - The rows to be validated.
   * @returns An object containing valid and invalid rows.
   */
  private async validateRows(rows: EarthquakeCsvRow[]): Promise<{
    validRows: EarthquakeCsvRow[];
    invalidRows: EarthquakeCsvRowOutput[];
  }> {
    const validRows: EarthquakeCsvRow[] = [];
    const invalidRows: EarthquakeCsvRowOutput[] = [];

    for (const row of rows) {
      const errors = await validate(row);

      if (errors.length > 0) {
        invalidRows.push(this.createInvalidRow(row, errors));
      } else {
        validRows.push(row);
      }
    }

    return { validRows, invalidRows };
  }

  /**
   * Creates an object representing an invalid row with validation errors.
   * @param row - The row with validation errors.
   * @param errors - The validation errors.
   * @returns An object representing the invalid row.
   */
  private createInvalidRow(
    row: EarthquakeCsvRow,
    errors: ValidationError[],
  ): EarthquakeCsvRowOutput {
    const output = plainToClass(EarthquakeCsvRowOutput, row);

    return {
      ...output,
      propertyError: errors.map((e) => e.property),
    };
  }

  /**
   * Processes rows in batches.
   * @param rows - The rows to be processed.
   * @param batchSize - The size of each batch.
   * @returns The total number of rows imported.
   */
  private async processBatches(
    rows: EarthquakeCsvRow[],
    batchSize: number,
  ): Promise<number> {
    const batches = [];
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      batches.push(this.processBatch(batch));
    }

    const results = await Promise.all(batches);
    return results.reduce((total, count) => total + count, 0);
  }

  /**
   * Processes a single batch of rows.
   * @param batch - The batch of rows to be processed.
   * @returns The number of rows successfully imported.
   */
  private async processBatch(batch: Earthquake[]): Promise<number> {
    const queryRunner =
      this.earthquakeRepo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(Earthquake, batch);
      await queryRunner.commitTransaction();
      return batch.length;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error(`Failed to save batch: ${this.getErrorMessage(error)}`);
      throw new Error(`Failed to save batch: ${this.getErrorMessage(error)}`);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Extracts the error message from an unknown error object.
   * @param error - The error object.
   * @returns The error message.
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}

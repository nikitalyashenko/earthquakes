import { ObjectType } from 'type-graphql';
import { Expose, plainToClass, Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EarthquakeMagType } from '../enums/earthquake-mag.enum';
import { EarthquakeSource } from '../enums/earthquake-source.enum';
import { Earthquake } from '../entities/earthquake.entity';

export interface EarthquakeCsvRowCreateOption {
  DateTime: string;
  Latitude: string;
  Longitude: string;
  Depth: string;
  Magnitude: string;
  MagType: string;
  NbStations?: string;
  Gap?: string;
  Distance?: string;
  RMS?: string;
  Source: string;
  EventID: string;
}

@ObjectType()
export class EarthquakeCsvRow extends Earthquake {
  @Expose({ name: 'DateTime' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateTime: Date;

  @Expose({ name: 'Latitude' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude: number;

  @Expose({ name: 'Longitude' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude: number;

  @Expose({ name: 'Depth' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  depth: number;

  @Expose({ name: 'Magnitude' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  magnitude: number;

  @Expose({ name: 'MagType' })
  @IsEnum(EarthquakeMagType)
  magType: EarthquakeMagType;

  @IsOptional()
  @Expose({ name: 'NbStations' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : null))
  @IsInt()
  nbStations: Maybe<number>;

  @IsOptional()
  @Expose({ name: 'Gap' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : null))
  @IsInt()
  gap: Maybe<number>;

  @IsOptional()
  @Expose({ name: 'Distance' })
  @Transform(({ value }) => (value ? parseFloat(value) : null))
  @IsNumber()
  distance: Maybe<number>;

  @IsOptional()
  @Expose({ name: 'RMS' })
  @Transform(({ value }) => (value ? parseFloat(value) : null))
  @IsNumber()
  rms: Maybe<number>;

  @Expose({ name: 'Source' })
  @IsEnum(EarthquakeSource)
  source: EarthquakeSource;

  @IsOptional()
  @Expose({ name: 'EventID' })
  @IsString()
  eventId: Maybe<string>;

  public static createFromCsv(
    row: EarthquakeCsvRowCreateOption,
  ): EarthquakeCsvRow {
    return plainToClass<EarthquakeCsvRow, EarthquakeCsvRowCreateOption>(
      EarthquakeCsvRow,
      row,
    );
  }
}

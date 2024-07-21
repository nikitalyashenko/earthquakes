import { Service } from 'typedi';
import { MigrationInterface, QueryRunner } from 'typeorm';

@Service()
export class UpdateSourceTypes1721556377278 implements MigrationInterface {
  name = 'UpdateSourceTypes1721556377278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."earthquake_source_enum" RENAME TO "earthquake_source_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."earthquake_source_enum" AS ENUM('AK', 'CI', 'HV', 'NC', 'NN', 'us', 'UU', 'UW', 'WY', 'AEI', 'ATH', 'CAS', 'DOE', 'GUC', 'ISK', 'JMA', 'MDD', 'NEI', 'PGC', 'REN', 'ROM', 'SJA', 'UCR', 'UNM', 'WEL')`,
    );
    await queryRunner.query(
      `ALTER TABLE "earthquake" ALTER COLUMN "source" TYPE "public"."earthquake_source_enum" USING "source"::"text"::"public"."earthquake_source_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."earthquake_source_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."earthquake_source_enum_old" AS ENUM('NEI', 'AK')`,
    );
    await queryRunner.query(
      `ALTER TABLE "earthquake" ALTER COLUMN "source" TYPE "public"."earthquake_source_enum_old" USING "source"::"text"::"public"."earthquake_source_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."earthquake_source_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."earthquake_source_enum_old" RENAME TO "earthquake_source_enum"`,
    );
  }
}

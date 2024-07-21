import { Service } from 'typedi';
import { MigrationInterface, QueryRunner } from 'typeorm';

@Service()
export class InitialMigration1721387458243 implements MigrationInterface {
  name = 'InitialMigration1721387458243';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."earthquake_magtype_enum" AS ENUM('ML', 'Mb', 'Ms')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."earthquake_source_enum" AS ENUM('NEI', 'AK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "earthquake" (
        "id" SERIAL NOT NULL,
        "dateTime" TIMESTAMP NOT NULL,
        "latitude" numeric(10,7) NOT NULL,
        "longitude" numeric(10,7) NOT NULL,
        "depth" numeric(5,2) NOT NULL,
        "magnitude" numeric(4,2) NOT NULL,
        "magType" "public"."earthquake_magtype_enum" NOT NULL,
        "nbStations" integer,
        "gap" integer,
        "distance" numeric(10,7),
        "rms" numeric(10,7),
        "source" "public"."earthquake_source_enum" NOT NULL,
        "eventId" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_a0e19a3fc6bdeeab552e1ceba90" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "earthquake"`);
    await queryRunner.query(`DROP TYPE "public"."earthquake_source_enum"`);
    await queryRunner.query(`DROP TYPE "public"."earthquake_magtype_enum"`);
  }
}

import { Service } from 'typedi';
import { MigrationInterface, QueryRunner } from 'typeorm';

@Service()
export class UpdateMagTypes1721556706321 implements MigrationInterface {
  name = 'UpdateMagTypes1721556706321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."earthquake_magtype_enum" RENAME TO "earthquake_magtype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."earthquake_magtype_enum" AS ENUM('Mb', 'Mc', 'Md', 'Me', 'ML', 'Ms', 'Mw', 'Unk')`,
    );
    await queryRunner.query(
      `ALTER TABLE "earthquake" ALTER COLUMN "magType" TYPE "public"."earthquake_magtype_enum" USING "magType"::"text"::"public"."earthquake_magtype_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."earthquake_magtype_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."earthquake_magtype_enum_old" AS ENUM('ML', 'Mb', 'Ms')`,
    );
    await queryRunner.query(
      `ALTER TABLE "earthquake" ALTER COLUMN "magType" TYPE "public"."earthquake_magtype_enum_old" USING "magType"::"text"::"public"."earthquake_magtype_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."earthquake_magtype_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."earthquake_magtype_enum_old" RENAME TO "earthquake_magtype_enum"`,
    );
  }
}

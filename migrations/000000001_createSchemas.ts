import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchemas1705660019836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createSchema("system", true);
    queryRunner.createSchema("rrhh", true);
    queryRunner.createSchema("informatic", true);
    queryRunner.createSchema("estate", true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export class UserAddAdmin1646172725647 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userAdminId = uuidV4();
    const userAdminPassword = await hash('admin', 8);

    await queryRunner.query(`
      INSERT INTO users (id, name, password, email, driver_license, is_admin) 
      values ('${userAdminId}', 'admin', '${userAdminPassword}', 'admin@rentx.com', 'XXXXX', true);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE name = 'admin';`);
  }
}

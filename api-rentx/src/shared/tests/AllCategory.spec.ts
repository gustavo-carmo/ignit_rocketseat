import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import app from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

describe('All category tests!', () => {
  let tokenAdmin: string;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const userAdminId = uuidV4();
    const userAdminPassword = hash('admin', 8);

    await connection.query(`
      INSERT INTO users (id, name, password, email, driver_license, is_admin) 
      values ('${userAdminId}', 'admin', '${userAdminPassword}', 'admin@rentx.com', 'XXXXX', true);`);

    const { body } = await request(app)
      .post('/session')
      .send({
        password: 'admin',
        email: 'admin@rentx.com',
      })
      .expect(200);

    tokenAdmin = body.refresh_token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const { body } = await request(app)
      .post('/categories')
      .send({
        name: 'New Category',
        description: 'New description category',
      })
      .set({
        Authorization: `Bearer ${tokenAdmin}`,
      })
      .expect(201);

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('created_at');
    expect(body.name).toBe('New Category');
    expect(body.description).toBe('New description category');
  });
});

import { setup, teardown, getApp } from '../data_base_service/mongo.test.setup';
import * as request from 'supertest';

describe('AccionesController (e2e)', () => {
  beforeAll(setup, 60000);
  afterAll(teardown);

  it('should compile successfully', () => {
    const moduleRef = getApp();
    expect(moduleRef).toBeDefined();
  });

  it('/acciones (GET)', async () => {
    const app = getApp(); 
    const server = app.getHttpServer(); 

    const response = await request(server).get('/acciones');

    expect(response.status).toBe(200);
  });
});
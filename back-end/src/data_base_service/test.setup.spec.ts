import { setup, teardown, getApp } from './mongo.test.setup';

describe('MongooseModule Setup', () => {
  beforeAll(setup, 60000);
  afterAll(teardown);

  it('should compile successfully', () => {
    const moduleRef = getApp();
    expect(moduleRef).toBeDefined();
  });
});
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ProductController } from '../src/api/product/product.controller';
import { Unpromise } from '../src/util/util.types';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/product (GET)', async () => {
    const response: {
      status: number;
      body: Unpromise<ReturnType<ProductController['getProducts']>>;
    } = await request(app.getHttpServer())
      .get('/product')
      .expect(200);

    const { status, body } = response;

    expect(status).toStrictEqual(200);
    expect(body.products).toBeInstanceOf(Array);
    expect(body.products).toHaveLength(3);
  });
});

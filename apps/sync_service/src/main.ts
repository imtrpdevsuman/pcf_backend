import { NestFactory } from '@nestjs/core';
import { SyncServiceModule } from './sync_service.module';
import cds from '@sap/cds';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(SyncServiceModule);
  const pdb = await cds.connect
    .to('db')
    .then((db) => {
      console.log('connected to db');
    })
    .catch((err) => {
      console.log('error connecting to db', err);
    });

  await app.listen(3003);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

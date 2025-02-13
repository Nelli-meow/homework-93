import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Fixtures } from './fixtures';

async function runFixtures() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const fixtures = app.get(Fixtures);
  await fixtures.seed();
  await app.close();
}

runFixtures()
  .then(() => {
    console.log('Fixtures', Fixtures);
  })
  .catch((e) => {
    console.error('Error:', e);
  });

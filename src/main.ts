import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { setupSwagger } from './swagger.setup';
import { setupPrettyJson } from './pretty.setup';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);
    setupPrettyJson(app);
    await app.listen(3000);
}
bootstrap();

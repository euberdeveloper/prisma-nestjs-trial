import { INestApplication } from '@nestjs/common';

export function setupPrettyJson(app: INestApplication): void {
    app.getHttpAdapter().getInstance().set('json spaces', 2);
}

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageJson from '../../../package.json';
import { INestApplication } from '@nestjs/common';

export const initializeSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('United API')
    .setDescription('United API Description')
    .setVersion(packageJson.version)
    .addTag('nestjs')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

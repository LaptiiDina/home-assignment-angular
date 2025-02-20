import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.enableCors({
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Vehicles Management API')
  .setDescription('API documentation for vehicle management system')
  .setVersion('1.0')
  .addTag('vehicles')
  .build();


const document = SwaggerModule.createDocument(app, swaggerConfig);

SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();



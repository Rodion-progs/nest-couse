import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from './pipes/validation.pipe';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const congig = new DocumentBuilder()
        .setTitle('Backend nestjs')
        .setDescription('documentation REST API')
        .setVersion('1.0.0')
        .addTag('Rodion')
        .build();

    const document = SwaggerModule.createDocument(app, congig);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

}

start();

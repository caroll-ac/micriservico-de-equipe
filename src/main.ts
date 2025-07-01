import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
    });

    swaggerConfig(app);

    app.enableCors({
      origin: '*',
    });

    await app.startAllMicroservices();
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);

    console.log(
      `Servidor rodando na porta ${PORT} - Documentação disponível em http://localhost:${PORT}/api`);
}
bootstrap();

import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { KafkaModule } from './infra/messaging/kafka.module';

@Module({
  imports: [
    HttpModule,
    KafkaModule
  ],
})
export class AppModule { }

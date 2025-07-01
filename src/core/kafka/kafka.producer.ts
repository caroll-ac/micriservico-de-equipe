import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Producer, ProducerRecord } from "kafkajs";
import { KafkaClient } from "./kafka.client";
import { set } from "zod";

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
    private producer: Producer;
    public isConnected =false;
    private readonly logger = new Logger(KafkaProducerService.name);

    constructor() {
        this.producer = KafkaClient.getInstance().producer();
    }

    async onModuleInit() {
      const maxAttempts = 1;
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          await this.producer.connect();
          this.isConnected = true;
          this.logger.log('Kafka producer conectado com sucesso.');
          return;
        } catch (error) {
          this.logger.warn(`Tentativa ${attempt} de conexão falhou. Tentando novamente em 3 segundos...`);
          await delay(3000);
        }
      }
  }

  async onModuleDestroy() {
    if (this.isConnected)
    await this.producer.disconnect();
  }

  async send(record: ProducerRecord) {
    return this.producer.send(record);
  }
}
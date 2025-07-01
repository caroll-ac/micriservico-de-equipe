import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Consumer, EachMessagePayload } from "kafkajs";
import { getKafkaConfig } from "./kafka.config";
import { KafkaClient } from "./kafka.client";

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
    private consumer: Consumer;
    private messageHandlers = new Map<string, (payload: EachMessagePayload) => Promise<void>>();
    private readonly logger = new Logger(KafkaConsumerService.name);
    public isConnected = false;

    constructor() {
        const config = getKafkaConfig()
        this.consumer = KafkaClient.getInstance().consumer({ groupId: config.groupId });
    }
    async onModuleInit() {
        try {
            await this.consumer.connect();
            this.isConnected = true;

            await this.consumer.run({
                eachMessage: async (payload) => {
                    const handler = this.messageHandlers.get(payload.topic);
                    if (handler) {
                        try {
                            await handler(payload);
                        } catch (err) {
                            this.logger.error(`Erro no handler do tópico ${payload.topic}`, err);
                        }
                    } else {
                        this.logger.warn(`Nenhum handler encontrado para o tópico ${payload.topic}`)
                    }
                },
            });
            
            this.logger.log('Kafka consumer iniciado e rodando');
        } catch (err) {
            this.isConnected = false;
            this.logger.error('Erro ao conectar ao Kafka (consumer). Tentando novamente...', err)
        }
    }

    async onModuleDestroy() {
        if (this.isConnected) {
            await this.consumer.disconnect();
            this.logger.log('Kafka consumer desconectado')
        }
    }

    async subscribe(
        topics: string[],
        handler: (payload: EachMessagePayload) => Promise<void>,
    ) {
        if (!this.isConnected) {
            this.logger.log('Kafka não está conectado. Subscribe ignorado.');
            return;
        }

        for (const topic of topics) {
            await this.consumer.subscribe({ topic, fromBeginning: true });
            this.messageHandlers.set(topic, handler);
            this.logger.log(`Inscrito no tópico: ${topic}`);
        }
    }
}
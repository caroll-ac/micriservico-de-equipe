import { Injectable } from "@nestjs/common";
import { KafkaConsumerService } from "src/core/kafka/kafka.consumer";
import { KafkaProducerService } from "src/core/kafka/kafka.producer";

@Injectable()
export class KafkaService {
    constructor(
        private readonly producer: KafkaProducerService,
        private readonly consumer: KafkaConsumerService,
    ) {}

    async sendMessage(topic: string, message: any, key?: string) {
        return this.producer.send({
            topic,
            messages: [
                {
                    key: key,
                    value: JSON.stringify(message),
                },
            ],
        });
    }

    async subscribe(topics: string[], handler: any) {
        return this.consumer.subscribe(topics, handler);
    }
}
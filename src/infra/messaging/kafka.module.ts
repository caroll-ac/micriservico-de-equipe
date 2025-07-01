import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { KafkaProducerService } from "src/core/kafka/kafka.producer";
import { KafkaConsumerService } from "src/core/kafka/kafka.consumer";

@Module({
    imports: [DatabaseModule],
    providers: [
        KafkaProducerService,
        KafkaConsumerService,
    ],
    exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
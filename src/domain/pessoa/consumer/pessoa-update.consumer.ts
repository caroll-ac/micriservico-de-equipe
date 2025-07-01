import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaConsumerService } from "src/core/kafka/kafka.consumer";
import { PrismaPessoaRefRepository } from "src/infra/database/prisma/repositories/prisma-pessoa-ref.repository";
import { PessoaUpdatedMessage } from "./interfaces/pessoa-message.interface";

@Injectable()
export class PessoaUpdatedConsumer implements OnModuleInit {
    constructor(
        private readonly consumerService: KafkaConsumerService,
        private readonly prismaPessoaRefRepository: PrismaPessoaRefRepository,
    ) {}

    async onModuleInit() {
        try {
            await this.consumerService.subscribe(
                ['pessoa.updated'],
                async (payload) => {
                    const message: PessoaUpdatedMessage = JSON.parse(
                        payload.message.value!.toString(),
                    );
                    await this.handlePessoaUpdated(message);
                },
            );
        } catch (error) {
            console.log(error);
        }
    }

    private async handlePessoaUpdated(message: PessoaUpdatedMessage) {
        await this.prismaPessoaRefRepository.update(message.id, {
            nome: message.nome,
        });
    }
}
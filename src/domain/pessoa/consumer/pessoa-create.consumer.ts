import { Injectable, OnModuleInit } from "@nestjs/common";
import { KafkaConsumerService } from "src/core/kafka/kafka.consumer";
import { PessoaCreatedMessage } from "./interfaces/pessoa-message.interface";

@Injectable()
export class PessoaCreatedConsumer implements OnModuleInit{
    constructor(
        private readonly consumerService: KafkaConsumerService,
        private readonly prismaPessoaRefRepository: PrismaPessoaRefRepository,
    ) {}

    async onModuleInit() {
        try {
            await this.consumerService.subscribe(
                ['pessoa.created'],
                async (payload) => {
                    const message: PessoaCreatedMessage = JSON.parse(
                        payload.message.value!.toString(),
                    );
                    await this.handlePessoaCreated(message);
                },
            );
        } catch (error) {
            console.log(error);
        }
    }

    private async handlePessoaCreated(message: PessoaCreatedMessage) {
    const pessoaRefEntity = PessoaRefEntity.create({
      pessoaRefId: message.id,
      nome: message.nome,
      cpf: message.cpf,
      status: message.status,
    });

    await this.prismaPessoaRefRepository.create(pessoaRefEntity);
    }
}
import { Injectable } from "@nestjs/common";
import { EquipeComposicaoRepository } from "../repository/equipeComposicao-repository";

@Injectable()
export class DeleteEquipeComposicaoUseCase {
    constructor(private equipeComposicaoRepository: EquipeComposicaoRepository) {}

    async delete(id: number): Promise<void> {
        return await this.equipeComposicaoRepository.delete(id);
    }
}
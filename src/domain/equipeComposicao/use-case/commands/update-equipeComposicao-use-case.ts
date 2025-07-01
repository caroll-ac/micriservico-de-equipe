import { Injectable } from "@nestjs/common";
import { EquipeComposicaoRepository } from "../repository/equipeComposicao-repository";
import { left, right } from "src/core/either";
import { EquipeComposicaoResponse } from "../types/equipeComposicao-response";

@Injectable()
export class UpdateEquipeComposicaoUseCase {
    constructor(private equipeComposicaoRepository: EquipeComposicaoRepository) {}

    async update(id: number, data: any, usrUpdate: number): Promise<EquipeComposicaoResponse> {
        const equipeComposicao = await this.equipeComposicaoRepository.update(id, data, usrUpdate);
        if (!equipeComposicao) {
            return left(null);
        }
        return right({ equipeComposicao });
    }
}
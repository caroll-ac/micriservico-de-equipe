import { Injectable } from "@nestjs/common";
import { EquipeComposicaoRepository } from "../repository/equipeComposicao-repository";
import { EquipeComposicaoListResponse, EquipeComposicaoResponse } from "../types/equipeComposicao-response";
import { left, right } from "src/core/either";

@Injectable()
export class FetchEquipeComposicaoUseCase {
    constructor(private readonly equipeComposicaoRepository: EquipeComposicaoRepository) {}

    async findById(id:number): Promise<EquipeComposicaoResponse> {
        const equipeComposicao = await this.equipeComposicaoRepository.findById(id);
        if (!equipeComposicao) {
            return left(null);
        }
        return right({ equipeComposicao });
    }

    async findAll(): Promise<EquipeComposicaoListResponse> {
        const equipeComposicaos = await this.equipeComposicaoRepository.findAll();
        if (!equipeComposicaos || equipeComposicaos.length === 0) {
            return left(null);
        }
        return right({ equipeComposicaos });
    }
}
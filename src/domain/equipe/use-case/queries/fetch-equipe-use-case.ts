import { Injectable } from "@nestjs/common";
import { EquipeRepository } from "../../repository/equipe-repository";
import { EquipeListResponse, EquipeResponse } from "../../types/equipe-response";
import { left, right } from "src/core/either";

@Injectable()
export class FetchEquipeUseCase {
    constructor(private readonly equipeRepository: EquipeRepository) {}

    async findById(id:number): Promise<EquipeResponse> {
        const equipe = await this.equipeRepository.findById(id);
        if (!equipe) {
            return left(null);
        }
        return right({ equipe });
    }

    async findAll(): Promise<EquipeListResponse> {
        const equipes = await this.equipeRepository.findAll();
        if (!equipes || equipes.length === 0) {
            return left(null);
        }
        return right({ equipes });
    }
}
import { Injectable } from "@nestjs/common";
import { EquipeRepository } from "../repository/equipe-repository";
import { left, right } from "src/core/either";
import { EquipeResponse } from "../types/equipe-response";

@Injectable()
export class UpdateEquipeUseCase {
    constructor(private equipeRepository: EquipeRepository) {}

    async update(id: number, data: any, usrUpdate: number): Promise<EquipeResponse> {
        data.nome = data.nome.trim().replace(/\s+/g, ' ');
        const equipe = await this.equipeRepository.update(id, data, usrUpdate);
        if (!equipe) {
            return left(null);
        }
        return right({ equipe });
    }
}
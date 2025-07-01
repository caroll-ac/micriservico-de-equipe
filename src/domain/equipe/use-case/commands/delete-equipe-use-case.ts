import { Injectable } from "@nestjs/common";
import { EquipeRepository } from "../repository/equipe-repository";

@Injectable()
export class DeleteEquipeUseCase {
    constructor(private equipeRepository: EquipeRepository) {}

    async delete(id: number): Promise<void> {
        return await this.equipeRepository.delete(id);
    }
}
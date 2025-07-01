import { right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { EquipeRepository } from '../../repository/equipe-repository';
import { CreateEquipeDto } from '../../dtos/create-equipe.dto';
import { EquipeResponse } from '../../types/equipe-response';
import { EquipeEntity } from '../../entities/equipe-entity';

@Injectable()
export class CreateEquipeUseCase {
    constructor(private EquipeRepository: EquipeRepository) { }

    async create(dto: CreateEquipeDto, usrCriacao: number): Promise<EquipeResponse> {
        {
            const equipe = this.createEquipe(dto);
            const savedEquipe = await this.saveEquipe(equipe, usrCriacao);
            return this.createResponse(savedEquipe);
        }
    }

    private createEquipe(dto: CreateEquipeDto): EquipeEntity {
        const { nome, descricao, usrCriacao } = dto;
        const nomeUnico = nome ? nome.trim().replace(/\s+/g, ' ') : 'Equipe sem nome';
        
        return EquipeEntity.create({
            nome: nomeUnico,
            descricao,
            usrCriacao,
            dataCriacao: new Date(), 
            dataUpdate: new Date(),  
        });
    }

    private async saveEquipe(Equipe: EquipeEntity, usrCriacao: number): Promise<EquipeEntity> {
        return await this.EquipeRepository.create(Equipe, usrCriacao);
    }

    private createResponse(equipe: EquipeEntity): EquipeResponse {
        return right({ equipe });
    }

}
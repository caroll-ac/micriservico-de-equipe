import { right } from 'src/core/either';
import { Injectable } from '@nestjs/common';
import { EquipeComposicaoRepository } from '../repository/equipeComposicao-repository';
import { CreateEquipeComposicaoDto } from '../dtos/create-equipeComposicao.dto';
import { EquipeComposicaoResponse } from '../types/equipeComposicao-response';
import { EquipeComposicaoEntity } from '../entities/equipeComposicao-entity';

@Injectable()
export class CreateEquipeComposicaoUseCase {
    constructor(private EquipeComposicaoRepository: EquipeComposicaoRepository) { }

    async create(dto: CreateEquipeComposicaoDto, usrCriacao: number): Promise<EquipeComposicaoResponse> {
        {
            const equipeComposicao = this.createEquipeComposicao(dto, usrCriacao);
            const savedEquipeComposicao = await this.saveEquipeComposicao(equipeComposicao, usrCriacao);
            return this.createResponse(savedEquipeComposicao);
        }
    }

    private createEquipeComposicao(dto: CreateEquipeComposicaoDto, usrCriacao: number): EquipeComposicaoEntity {
        const { equipeId, pessoaId, finalidade } = dto; 
    
        return EquipeComposicaoEntity.create({
          equipeId,
          pessoaId,
          finalidade,
          usrCriacao, 
          dataCriacao: new Date(),
          dataUpdate: new Date(),
        });
      }

    private async saveEquipeComposicao(EquipeComposicao: EquipeComposicaoEntity, usrCriacao: number): Promise<EquipeComposicaoEntity> {
        return await this.EquipeComposicaoRepository.create(EquipeComposicao, usrCriacao);
    }

    private createResponse(equipeComposicao: EquipeComposicaoEntity): EquipeComposicaoResponse {
        return right({ equipeComposicao });
    }

}
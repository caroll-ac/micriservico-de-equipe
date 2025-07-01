import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEquipeComposicaoDto {
    @ApiProperty({ description: 'ID da equipe à qual o membro será vinculado', example: 1 })
    equipeId: number;
  
    @ApiPropertyOptional({ description: 'ID da pessoa que será adicionada à equipe', example: 1 })
    pessoaId: number;
  
    @ApiPropertyOptional({ description: 'Finalidade ou função do membro dentro da equipe', example: 'Responsável técnico' })
    finalidade?: string;

    @ApiProperty({ description: 'Usuário Criação', example: 1 })
    usrCriacao: number;
}
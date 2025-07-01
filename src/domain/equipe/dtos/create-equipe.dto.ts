import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEquipeDto {
    @ApiProperty({ description: 'Nome da equipe', example: 'editar_equipe' })
    nome?: string;
  
    @ApiPropertyOptional({ description: 'Descrição da equipe', example: 'Equipe com permissões administrativas' })
    descricao?: string;
  
    @ApiPropertyOptional({ description: 'Usuario Criação', example: 1 })
    usrCriacao: number;
}
import { ApiProperty } from "@nestjs/swagger";

export class UpdateEquipeDto {
    @ApiProperty({ description: 'Nome da Equipe', example: 'Equipe Especializada' })
    nome?: string;

    @ApiProperty({ description: 'Descrição da equipe', example: 'Equipe com permissões administrativas' })
    descricao?: string;

    @ApiProperty({ description: 'Usuário Atualização', example: 2 })
    usrUpdate: number;
}
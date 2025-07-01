import { ApiProperty } from "@nestjs/swagger";

export class UpdateEquipeComposicaoDto {
    @ApiProperty({ description: 'ID da equipe à qual o membro será vinculado', example: 'EquipeComposicao Especializada' })
    equipeId?: number;

    @ApiProperty({ description: 'ID da pessoa que será adicionada à equipe', example: 'EquipeComposicao com permissões administrativas' })
    pessoaId?: number;

    @ApiProperty({ description: 'Finalidade ou função do membro dentro da equipe', example: 2 })
    finalidade?: string;

    @ApiProperty({ description: 'Usuário Atualização', example: 2 })
    usrUpdate: number;
}
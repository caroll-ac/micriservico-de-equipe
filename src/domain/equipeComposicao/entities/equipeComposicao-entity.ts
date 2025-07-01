import { BaseEntity } from "src/core/entities/base-entity";

export interface MembroEquipeComposicao {
    pessoaId: number;
    finalidade?: string;
}
export interface EquipeComposicaoProps {
    id?: number;
    equipeId: number;
    pessoaId: number;
    finalidade?: string;
    usrCriacao: number;
    usrUpdate?: number | undefined | null;
    usrDelete?: number | undefined | null;
    dataCriacao: Date;
    dataUpdate: Date;
    dataDelete?: Date | undefined | null; 
}

export class EquipeComposicaoEntity extends BaseEntity<EquipeComposicaoProps> {
    static create(props: EquipeComposicaoProps) {
        return new EquipeComposicaoEntity(props);
    }

}
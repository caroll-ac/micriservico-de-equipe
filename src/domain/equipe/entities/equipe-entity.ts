import { BaseEntity } from "src/core/entities/base-entity";

export interface MembroEquipe {
    pessoaReferenciaId: number;
    finalidade: string;
}
export interface EquipeProps {
    id?: number;
    nome?: string | undefined | null;
    descricao?: string | undefined | null;
    usrCriacao: number;
    usrUpdate?: number | undefined | null;
    usrDelete?: number | undefined | null;
    dataCriacao: Date;
    dataUpdate: Date;
    dataDelete?: Date | undefined | null; 
}

export class EquipeEntity extends BaseEntity<EquipeProps> {
    static create(props: EquipeProps) {
        return new EquipeEntity(props);
    }

}
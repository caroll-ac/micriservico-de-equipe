import { BaseEntity } from "src/core/entities/base-entity";

export interface PessoaRefProps {
    pessoaRefId: number;
    nome: string;
    cpf: string;
    status: boolean;
}

export class PessoaRefEntity extends BaseEntity<PessoaRefProps> {
    constructor(props: PessoaRefProps) {
        super(props);  
    }

    static create(props: PessoaRefProps): PessoaRefEntity {
        return new PessoaRefEntity(props);
    }
}

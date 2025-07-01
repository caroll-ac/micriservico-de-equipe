export interface PessoaCreatedMessage {
    id: number;
    nome: string;
    cpf: string;
    status: boolean;
}

export interface PessoaUpdatedMessage {
    id: number;
    nome: string;
    status: boolean;
}
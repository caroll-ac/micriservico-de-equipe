import { UpdateEquipeComposicaoDto } from "../dtos/update-equipeComposicao.dto";
import { EquipeComposicaoEntity } from "../entities/equipeComposicao-entity";

export abstract class EquipeComposicaoRepository {
    abstract create(equipeComposicao: EquipeComposicaoEntity, usrCriacao: number): Promise<EquipeComposicaoEntity>;
    abstract update(id: number, data: any, usrUpdate: number): Promise<EquipeComposicaoEntity | null>
    abstract findById(id: number): Promise<EquipeComposicaoEntity | null>;
    abstract findAll(): Promise<EquipeComposicaoEntity[]>;
    abstract delete(id: number): Promise<void>;
}
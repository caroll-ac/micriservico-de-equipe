import { UpdateEquipeDto } from "../dtos/update-equipe.dto";
import { EquipeEntity } from "../entities/equipe-entity";

export abstract class EquipeRepository {
    abstract create(equipe: EquipeEntity, usrCriacao: number): Promise<EquipeEntity>;
    abstract update(id: number, data: any, usrUpdate: number): Promise<EquipeEntity | null>
    abstract findById(id: number): Promise<EquipeEntity | null>;
    abstract findAll(): Promise<EquipeEntity[]>;
    abstract delete(id: number): Promise<void>;
}
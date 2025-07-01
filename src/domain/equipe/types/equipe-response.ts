import { Either } from "src/core/either";
import { EquipeEntity } from "../entities/equipe-entity"

export type EquipeResponse = Either<
    null,
    {
        equipe: EquipeEntity;
    }
>;

export type EquipeListResponse = Either<
    null,
    {
        equipes: EquipeEntity[];
    }
>;
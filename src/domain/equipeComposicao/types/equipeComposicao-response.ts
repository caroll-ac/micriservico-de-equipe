import { Either } from "src/core/either";
import { EquipeComposicaoEntity } from "../entities/equipeComposicao-entity"

export type EquipeComposicaoResponse = Either<
    null,
    {
        equipeComposicao: EquipeComposicaoEntity;
    }
>;

export type EquipeComposicaoListResponse = Either<
    null,
    {
        equipeComposicaos: EquipeComposicaoEntity[];
    }
>;
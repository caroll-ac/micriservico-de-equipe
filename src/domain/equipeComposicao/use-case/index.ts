export * from './commands/create-equipeComposicao-use-case';
export * from './commands/delete-equipeComposicao-use-case';
export * from './queries/fetch-equipeComposicao-use-case';
export * from './commands/update-equipeComposicao-use-case';

import { CreateEquipeComposicaoUseCase, DeleteEquipeComposicaoUseCase, FetchEquipeComposicaoUseCase, UpdateEquipeComposicaoUseCase } from ".";

export const equipeComposicaoUseCase = [
    CreateEquipeComposicaoUseCase,
    DeleteEquipeComposicaoUseCase,
    FetchEquipeComposicaoUseCase,
    UpdateEquipeComposicaoUseCase,
]
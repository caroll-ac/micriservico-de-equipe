export * from "./commands/create-equipe-use-case";
export * from "./queries/fetch-equipe-use-case";
export * from "./commands/delete-equipe-use-case";
export * from "./commands/update-equipe-use-case";

import { CreateEquipeUseCase } from "./commands/create-equipe-use-case";
import { DeleteEquipeUseCase } from "./commands/delete-equipe-use-case";
import { UpdateEquipeUseCase } from "./commands/update-equipe-use-case";
import { FetchEquipeUseCase } from "./queries/fetch-equipe-use-case";

export const equipeUseCase = [
    CreateEquipeUseCase,
    FetchEquipeUseCase,
    UpdateEquipeUseCase,
    DeleteEquipeUseCase,
];
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { EquipeController } from "./controller/equipe.controller";
import { EquipeRepository } from "src/domain/equipe/repository/equipe-repository";
import { PrismaEquipeRepository } from "../database/prisma/repositories/prisma-equipe-repository";
import { equipeUseCase } from "src/domain/equipe/use-case";
import { EquipeComposicaoController } from "./controller/equipeComposicao.controller";
import { EquipeComposicaoRepository } from "src/domain/equipeComposicao/repository/equipeComposicao-repository";
import { PrismaEquipeComposicaoRepository } from "../database/prisma/repositories/prisma-equipeComposicao-repository";
import { equipeComposicaoUseCase } from "src/domain/equipeComposicao/use-case";
import { KafkaModule } from "../messaging/kafka.module";

@Module({
    imports: [
        DatabaseModule,
        KafkaModule,
    ],
    controllers: [
        EquipeController,
        EquipeComposicaoController,
    ],
    providers: [
        {
            provide: EquipeRepository,
            useClass: PrismaEquipeRepository,
        },
        {
            provide: EquipeComposicaoRepository,
            useClass: PrismaEquipeComposicaoRepository,
        },
        ...equipeUseCase,
        ...equipeComposicaoUseCase,
    ],
})
export class HttpModule {}
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaEquipeRepository } from "./prisma/repositories/prisma-equipe-repository";
import { EquipeRepository } from "src/domain/equipe/repository/equipe-repository";
import { PrismaEquipeComposicaoRepository } from "./prisma/repositories/prisma-equipeComposicao-repository";
import { EquipeComposicaoRepository } from "src/domain/equipeComposicao/repository/equipeComposicao-repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaService,
        PrismaEquipeRepository,
        {
            useClass: PrismaEquipeRepository,
            provide: EquipeRepository,
        },
        PrismaEquipeComposicaoRepository,
        {
            provide: EquipeComposicaoRepository,
            useClass: PrismaEquipeComposicaoRepository,
        },
    ],
    exports: [
        PrismaService,
        EquipeRepository,
        EquipeComposicaoRepository,
    ],
})

export class DatabaseModule {}
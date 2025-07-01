import { Prisma, Equipe as PrismaEquipe } from "@prisma/client";
import { EquipeEntity, EquipeProps } from "src/domain/equipe/entities/equipe-entity";

export class PrismaEquipeMapper {
    static toDomain(raw: PrismaEquipe): EquipeEntity {
        const {...baseProps } = raw;
        return EquipeEntity.create(
            {
                ...baseProps as EquipeProps,
            },
        );
    }

    static toPrisma(equipe: EquipeEntity): Prisma.EquipeUncheckedCreateInput{
        const { ...baseProps } = equipe.data;
        return {
            ...baseProps,
        };
    };
}
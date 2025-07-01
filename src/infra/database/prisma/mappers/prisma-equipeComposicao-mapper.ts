import { Prisma, EquipeComposicao as PrismaEquipeComposicao } from "@prisma/client";
import { EquipeComposicaoEntity, EquipeComposicaoProps } from "src/domain/equipeComposicao/entities/equipeComposicao-entity";

export class PrismaEquipeComposicaoMapper {
    static toDomain(raw: PrismaEquipeComposicao): EquipeComposicaoEntity {
        const {...baseProps } = raw;
        return EquipeComposicaoEntity.create(
            {
                ...baseProps as EquipeComposicaoProps,
            },
        );
    }

    static toPrisma(equipeComposicao: EquipeComposicaoEntity): Prisma.EquipeComposicaoUncheckedCreateInput{
        const { ...baseProps } = equipeComposicao.data;
        return {
            ...baseProps,
        };
    };
}
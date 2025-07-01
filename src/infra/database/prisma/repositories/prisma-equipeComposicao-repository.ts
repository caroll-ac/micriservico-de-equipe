import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EquipeComposicaoRepository } from 'src/domain/equipeComposicao/repository/equipeComposicao-repository';
import { EquipeComposicaoEntity, EquipeComposicaoProps } from 'src/domain/equipeComposicao/entities/equipeComposicao-entity';
import { PrismaEquipeComposicaoMapper } from '../mappers/prisma-equipeComposicao-mapper';

@Injectable()
export class PrismaEquipeComposicaoRepository implements EquipeComposicaoRepository {
    constructor(private prisma: PrismaService) {}

    async create(equipeComposicao: EquipeComposicaoEntity, usrCriacao: number): Promise<EquipeComposicaoEntity> {
        const { ...baseProps } = equipeComposicao.data;
        const createEquipeComposicao = await this.prisma.equipeComposicao.create({
            data: baseProps,
        });

        return PrismaEquipeComposicaoMapper.toDomain(createEquipeComposicao);

    }

    async update(id: number, data: Partial<EquipeComposicaoProps>, usrUpdate: number): Promise<EquipeComposicaoEntity | null> {
        const equipeComposicao = await this.prisma.equipeComposicao.findUnique({ where: { id: Number(id) } });
        if (!equipeComposicao) return null;
        const { ...baseProps } = data;
        const updatedEquipeComposicao = await this.prisma.equipeComposicao.update({
             where: { id: Number(id) },
             data: {
                ...baseProps,
             }
         });

        return PrismaEquipeComposicaoMapper.toDomain(updatedEquipeComposicao);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.equipeComposicao.delete({ where: { id } });
    }

    async findAll(): Promise<EquipeComposicaoEntity[]> {
        const equipeComposicaos = await this.prisma.equipeComposicao.findMany();
        return equipeComposicaos.map(equipeComposicao => PrismaEquipeComposicaoMapper.toDomain(equipeComposicao));
    }

    async findById(id: number): Promise<EquipeComposicaoEntity | null> {
        const equipeComposicao = await this.prisma.equipeComposicao.findUnique({
            where: { id: Number(id) },
        });
        if (!equipeComposicao) return null;
        return PrismaEquipeComposicaoMapper.toDomain(equipeComposicao);
    }
}

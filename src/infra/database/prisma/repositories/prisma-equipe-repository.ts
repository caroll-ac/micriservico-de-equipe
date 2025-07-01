import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EquipeRepository } from 'src/domain/equipe/repository/equipe-repository';
import { PrismaEquipeMapper } from '../mappers/prisma-equipe-mapper';
import { EquipeEntity, EquipeProps } from 'src/domain/equipe/entities/equipe-entity';

@Injectable()
export class PrismaEquipeRepository implements EquipeRepository {
    constructor(private prisma: PrismaService) {}

    async create(equipe: EquipeEntity, usrCriacao: number): Promise<EquipeEntity> {
        const { ...baseProps } = equipe.data;
        const createEquipe = await this.prisma.equipe.create({
            data: baseProps,
        });

        return PrismaEquipeMapper.toDomain(createEquipe);

    }

    async update(id: number, data: Partial<EquipeProps>, usrUpdate: number): Promise<EquipeEntity | null> {
        const equipe = await this.prisma.equipe.findUnique({ where: { id: Number(id) } });
        if (!equipe) return null;
        const { ...baseProps } = data;
        const updatedEquipe = await this.prisma.equipe.update({
             where: { id: Number(id) },
             data: {
                ...baseProps,
             }
         });

        return PrismaEquipeMapper.toDomain(updatedEquipe);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.equipe.delete({ where: { id } });
    }

    async findAll(): Promise<EquipeEntity[]> {
        const equipes = await this.prisma.equipe.findMany();
        return equipes.map(equipe => PrismaEquipeMapper.toDomain(equipe));
    }

    async findById(id: number): Promise<EquipeEntity | null> {
        const equipe = await this.prisma.equipe.findUnique({
            where: { id: Number(id) },
        });
        if (!equipe) return null;
        return PrismaEquipeMapper.toDomain(equipe);
    }
}

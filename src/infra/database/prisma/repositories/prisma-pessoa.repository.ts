import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PessoaRefEntity, PessoaRefProps } from 'src/domain/pessoa/entities/pessoa-entity';


@Injectable()
export class PrismaPessoaRefRepository {
    constructor(private prisma: PrismaService) {}

    async create(pessoaRef: PessoaRefEntity): Promise<PessoaRefEntity> {
        const baseProps = pessoaRef.data;
        const createdPessoa = await this.prisma.pessoa.create({
            data: baseProps,  
        });

        return PessoaRefEntity.create(createdPessoa);  
    }

    async update(id: number, data: Partial<PessoaRefProps>): Promise<PessoaRefEntity | null> {
        const pessoa = await this.prisma.pessoa.findUnique({ where: { id } });
        if (!pessoa) return null;

        const updatedPessoa = await this.prisma.pessoa.update({
            where: { id },
            data: data,  
        });

        return PessoaRefEntity.create(updatedPessoa); 
    }

    async updateStatus(id: number, status: boolean): Promise<PessoaRefEntity | null> {
        const pessoa = await this.prisma.pessoa.findUnique({ where: { id }});
        if (!pessoa) return null;

        const updated = await this.prisma.pessoa.update({
            where: { id }
        })
    }
}

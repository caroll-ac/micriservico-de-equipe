import { CreateEquipeComposicaoDto } from "src/domain/equipeComposicao/dtos/create-equipeComposicao.dto";
import { UpdateEquipeComposicaoDto } from "src/domain/equipeComposicao/dtos/update-equipeComposicao.dto";
import { z } from "zod";

export const equipeComposicaoSchema = {
    create: z.object({
        equipeId: z.number().int().positive({ message: "ID da equipe é obrigatório e deve ser positivo" }),
        pessoaId: z.number().int().positive({ message: "ID da pessoa é obrigatório e deve ser positivo" }),
        finalidade: z.string().min(3, "Finalidade deve ter no mínimo 3 caracteres"),
        usrCriacao: z.number().int().positive({ message: "Usuário de criação é obrigatório" }),
      }).transform((data) => data as CreateEquipeComposicaoDto),

    update: z.object({
        equipeId: z.number().int().positive().optional(),
        pessoaId: z.number().int().positive().optional(),
        finalidade: z.string().min(3, "Finalidade deve ter no mínimo 3 caracteres").optional(),
        usrUpdate: z.number().int().positive({ message: "Usuário de atualização é obrigatório" }),
    }),

    findById: z.object({id: z.number().int().positive()}).transform((data) => data as { id: number }),

    fetchAll: z.object({
        equipeId: z.number().optional(),
        pessoaId: z.number().optional(),
        finalidade: z.string().optional(),
    }).transform((data) => data as {}),

    delete: z.string().transform((val) => Number(val)).pipe(z.number().int().positive())
};

export type CreateEquipeComposicaoBody = z.infer<typeof equipeComposicaoSchema.create>;
export type UpdateEquipeComposicaoBody = z.infer<typeof equipeComposicaoSchema.update>;
export type FindByIdEquipeComposicaoSchema = z.infer<typeof equipeComposicaoSchema.findById>;
export type FetchAllEquipeComposicaoUseCaseRequest = z.infer<typeof equipeComposicaoSchema.fetchAll>;
export type DeleteEquipeComposicaoUseCaseRequest = z.infer<typeof equipeComposicaoSchema.delete>;


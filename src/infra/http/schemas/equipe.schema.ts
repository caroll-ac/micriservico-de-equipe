import { CreateEquipeDto } from "src/domain/equipe/dtos/create-equipe.dto";
import { z } from "zod";

export const equipeSchema = {
    create: z.object({
        nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
        descricao: z.string().min(3).max(255, "A descricao deve ter no máximo 255 caracteres").optional(),
        usrCriacao: z.number(),
    }).transform((data) => data as CreateEquipeDto),

    update: z.object({
        nome: z.string().trim().min(3, "Nome é opcional").optional(),
        descricao: z.string().min(3).max(255, "A descricao deve ter no máximo 255 caracteres").optional(),
        usrUpdate: z.number().min(1, "Responsável por atualizar é obrigatório"),
    }),

    findById: z.object({id: z.number().int().positive()}).transform((data) => data as { id: number }),

    fetchAll: z.object({
        nome: z.string(),
        descricao: z.string().optional(),
    }).transform((data) => data as {}),

    delete: z.string().transform((val) => Number(val)).pipe(z.number().int().positive())
};

export type CreateEquipeBody = z.infer<typeof equipeSchema.create>;
export type UpdateEquipeBody = z.infer<typeof equipeSchema.update>;
export type FindByIdEquipeSchema = z.infer<typeof equipeSchema.findById>;
export type FetchAllEquipeUseCaseRequest = z.infer<typeof equipeSchema.fetchAll>;
export type DeleteEquipeUseCaseRequest = z.infer<typeof equipeSchema.delete>;


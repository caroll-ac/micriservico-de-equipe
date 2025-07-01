import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateEquipeDto } from "src/domain/equipe/dtos/create-equipe.dto";
import { CreateEquipeUseCase, DeleteEquipeUseCase, FetchEquipeUseCase, UpdateEquipeUseCase } from "src/domain/equipe/use-case";
import { UpdateEquipeDto } from "src/domain/equipe/dtos/update-equipe.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import { equipeSchema } from "../schemas/equipe.schema";
import { EquipePresenter } from "../presenters/equipe.presenter";

@Controller('equipe')
export class EquipeController {
    constructor(
        private readonly createEquipeUseCase: CreateEquipeUseCase,
        private readonly fetchEquipeUseCase: FetchEquipeUseCase,
        private readonly updateEquipeUseCase: UpdateEquipeUseCase,
        private readonly deleteEquipeUseCase: DeleteEquipeUseCase,
    ) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: ' Cria uma nova equipe' })
    @ApiResponse({ status: 201, description: 'Equipe criada com sucesso. '})
    @ApiResponse({ status: 400, description: 'Dados inválidos.'})
    async create(@Body(new ZodValidationPipe(equipeSchema.create)) data: CreateEquipeDto) {
        const equipe = await this.createEquipeUseCase.create(data, data.usrCriacao!);

        if (equipe.isLeft()){
            throw new BadRequestException(equipe.value);
        }
        return {
            message: 'Equipe criada',
            data: EquipePresenter.toResponse(equipe.value.equipe),
        }
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as equipes'})
    @ApiResponse({ status: 200, description: 'Listar de equipes retornadas com sucesso' })
    async findAll() {
        const busca = await this.fetchEquipeUseCase.findAll();

        if (busca.isRight()) {
            return busca.value.equipes.map(EquipePresenter.toResponse);
    }
    throw new BadRequestException(busca.value);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca uma equipe pelo ID' })
    @ApiResponse({ status: 200, description: 'Equipe encontrada.' })
    @ApiResponse({ status: 404, description: 'Equipe não encontrada' })
    async findById(@Param('id') id: number) {
        const busca = await this.fetchEquipeUseCase.findById(id);

        if (busca.isRight()) {
            return EquipePresenter.toResponse(busca.value.equipe);
        }
        throw new BadRequestException(busca.value);
    }

    @Patch('id')
    @ApiOperation({ summary: 'Atualizar uma equipe pelo ID.' })
    @ApiResponse({ status: 200, description: 'Equipe atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Equipe não encontrada.' })
    async update(@Param('id') id: number, @Body(new ZodValidationPipe(equipeSchema.update)) data: UpdateEquipeDto) {
        const update = await this.updateEquipeUseCase.update(id, data, data.usrUpdate);
        if (update.isRight()) return EquipePresenter.toResponse(update.value.equipe);
    }

    @Delete('id')
    @ApiOperation({ summary: 'Deletar uma equipe pelo ID.' })
    @ApiResponse({ status: 200, description: 'Equipe atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Equipe não encontrada.' })
    async delete(@Param(('id'), new ZodValidationPipe(equipeSchema.delete)) id: number) {
        await this.deleteEquipeUseCase.delete(Number(id));
        return { message: 'Apagada com sucesso.' }
    }
}
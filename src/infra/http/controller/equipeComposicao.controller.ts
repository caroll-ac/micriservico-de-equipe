import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateEquipeComposicaoDto } from "src/domain/equipeComposicao/dtos/create-equipeComposicao.dto";
import { CreateEquipeComposicaoUseCase, DeleteEquipeComposicaoUseCase, FetchEquipeComposicaoUseCase, UpdateEquipeComposicaoUseCase } from "src/domain/equipeComposicao/use-case";
import { UpdateEquipeComposicaoDto } from "src/domain/equipeComposicao/dtos/update-equipeComposicao.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import { equipeComposicaoSchema } from "../schemas/equipeComposicao.schema";
import { EquipeComposicaoPresenter } from "../presenters/equipeComposicao.presenter";

@Controller('equipeComposicao')
export class EquipeComposicaoController {
    constructor(
        private readonly createEquipeComposicaoUseCase: CreateEquipeComposicaoUseCase,
        private readonly fetchEquipeComposicaoUseCase: FetchEquipeComposicaoUseCase,
        private readonly updateEquipeComposicaoUseCase: UpdateEquipeComposicaoUseCase,
        private readonly deleteEquipeComposicaoUseCase: DeleteEquipeComposicaoUseCase,
    ) {}

    @Post("criar")
    @HttpCode(201)
    @ApiOperation({ summary: 'Cria uma nova composição de equipe.' })
    @ApiResponse({ status: 201, description: 'Composição criada com sucesso.'})
    @ApiResponse({ status: 400, description: 'Dados inválidos.'})
    async create(@Body(new ZodValidationPipe(equipeComposicaoSchema.create)) data: CreateEquipeComposicaoDto) {
        const equipeComposicao = await this.createEquipeComposicaoUseCase.create(data, data.usrCriacao!);

        if (equipeComposicao.isLeft()){
            throw new BadRequestException(equipeComposicao.value);
        }
        return {
            message: 'EquipeComposicao criada',
            data: EquipeComposicaoPresenter.toResponse(equipeComposicao.value.equipeComposicao),
        }
    }

    @Get()
    @ApiOperation({ summary: 'Lista todas as composições de equipe.'})
    @ApiResponse({ status: 200, description: 'Lista de composições retornada com sucesso.' })
    async findAll() {
        const busca = await this.fetchEquipeComposicaoUseCase.findAll();

        if (busca.isRight()) {
            return busca.value.equipeComposicaos.map(EquipeComposicaoPresenter.toResponse);
    }
    throw new BadRequestException(busca.value);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca uma composição de equipe pelo ID.' })
    @ApiResponse({ status: 200, description: 'Composição encontrada.' })
    @ApiResponse({ status: 404, description: 'Composição não encontrada' })
    async findById(@Param('id') id: number) {
        const busca = await this.fetchEquipeComposicaoUseCase.findById(id);

        if (busca.isRight()) {
            return EquipeComposicaoPresenter.toResponse(busca.value.equipeComposicao);
        }
        throw new BadRequestException(busca.value);
    }

    @Patch("atualizar/:id")
    @ApiOperation({ summary: 'Atualizar uma composição de equipe pelo ID.' })
    @ApiResponse({ status: 200, description: 'Composição atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Composição não encontrada.' })
    async update(@Param('id') id: number, @Body(new ZodValidationPipe(equipeComposicaoSchema.update)) data: UpdateEquipeComposicaoDto) {
        const update = await this.updateEquipeComposicaoUseCase.update(id, data, data.usrUpdate);
        if (update.isRight()) return EquipeComposicaoPresenter.toResponse(update.value.equipeComposicao);
    }

    @Delete("deletar/:id")
    @ApiOperation({ summary: 'Deletar uma composição de equipe pelo ID.' })
    @ApiResponse({ status: 200, description: 'Composição atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Composição não encontrada.' })
    async delete(@Param(('id'), new ZodValidationPipe(equipeComposicaoSchema.delete)) id: number) {
        await this.deleteEquipeComposicaoUseCase.delete(Number(id));
        return { message: 'Apagada com sucesso.' }
    }
}
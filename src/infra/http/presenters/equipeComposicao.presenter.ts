import { EquipeComposicaoEntity } from "src/domain/equipeComposicao/entities/equipeComposicao-entity";

export class EquipeComposicaoPresenter {
    static toResponse(equipeComposicao: EquipeComposicaoEntity) {
        const {...baseProps } = equipeComposicao.data;
        return {...baseProps};
    }
}
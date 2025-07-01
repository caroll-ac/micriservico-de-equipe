import { EquipeEntity } from "src/domain/equipe/entities/equipe-entity";

export class EquipePresenter {
    static toResponse(equipe: EquipeEntity) {
        const {...baseProps } = equipe.data;
        return {...baseProps};
    }
}
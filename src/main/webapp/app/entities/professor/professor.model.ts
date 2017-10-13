import { BaseEntity } from './../../shared';

export class Professor implements BaseEntity {
    constructor(
        public id?: number,
        public professorBancaId?: number,
        public alunoId?: number,
        public areaId?: number,
        public userId?: number,
        public coOrientadorId?: number,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class ProfessorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public professorBancaId?: number,
        public alunoId?: number,
        public areaId?: number,
        public coOrientadorId?: number,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class CoOrientador implements BaseEntity {
    constructor(
        public id?: number,
        public alunoId?: number,
        public professorId?: number,
    ) {
    }
}

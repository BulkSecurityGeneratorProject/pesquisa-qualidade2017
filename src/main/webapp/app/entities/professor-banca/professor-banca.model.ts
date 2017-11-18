import { BaseEntity } from './../../shared';

export class ProfessorBanca implements BaseEntity {
    constructor(
        public id?: number,
        public nota?: number,
        public professorId?: number,
        public bancaId?: number,
    ) {
    }
}

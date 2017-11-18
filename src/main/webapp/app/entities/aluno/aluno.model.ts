import { BaseEntity } from './../../shared';

export class Aluno implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public userId?: number,
        public orientadorId?: number,
    ) {
    }
}

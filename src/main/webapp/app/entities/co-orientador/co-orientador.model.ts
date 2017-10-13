import { BaseEntity } from './../../shared';

export class CoOrientador implements BaseEntity {
    constructor(
        public id?: number,
        public alunos?: BaseEntity[],
        public professors?: BaseEntity[],
    ) {
    }
}

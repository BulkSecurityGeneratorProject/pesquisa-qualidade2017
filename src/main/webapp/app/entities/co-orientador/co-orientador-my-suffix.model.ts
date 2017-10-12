import { BaseEntity } from './../../shared';

export class CoOrientadorMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public alunos?: BaseEntity[],
        public professors?: BaseEntity[],
    ) {
    }
}

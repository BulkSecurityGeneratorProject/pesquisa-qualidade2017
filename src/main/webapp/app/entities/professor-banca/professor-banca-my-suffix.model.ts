import { BaseEntity } from './../../shared';

export class ProfessorBancaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nota?: number,
        public professors?: BaseEntity[],
        public bancas?: BaseEntity[],
    ) {
    }
}

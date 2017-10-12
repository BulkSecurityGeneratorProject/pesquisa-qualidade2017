import { BaseEntity } from './../../shared';

export class TeseMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nota?: number,
        public link?: string,
        public alunoId?: number,
        public apresentacaoId?: number,
    ) {
    }
}

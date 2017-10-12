import { BaseEntity } from './../../shared';

export class AreaPesquisaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
    ) {
    }
}

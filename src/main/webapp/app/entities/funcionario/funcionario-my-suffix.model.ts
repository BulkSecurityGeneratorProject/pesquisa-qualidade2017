import { BaseEntity } from './../../shared';

export class FuncionarioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
    ) {
    }
}

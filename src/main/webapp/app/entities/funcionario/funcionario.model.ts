import { BaseEntity } from './../../shared';

export class Funcionario implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
    ) {
    }
}

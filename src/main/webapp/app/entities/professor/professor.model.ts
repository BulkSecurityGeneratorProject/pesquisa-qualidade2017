import { BaseEntity } from './../../shared';

export class Professor implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public areaId?: number,
        public userId?: number,
    ) {
    }
}

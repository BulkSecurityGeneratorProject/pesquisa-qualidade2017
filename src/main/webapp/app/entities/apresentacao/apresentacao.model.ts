import { BaseEntity } from './../../shared';

export class Apresentacao implements BaseEntity {
    constructor(
        public id?: number,
        public data?: any,
        public flgagendamentoaprovado?: boolean,
        public flgproposta?: boolean,
        public bancaId?: number,
        public idTeseProposta?: number
    ) {
        this.flgagendamentoaprovado = false;
        this.flgproposta = false;
    }
}

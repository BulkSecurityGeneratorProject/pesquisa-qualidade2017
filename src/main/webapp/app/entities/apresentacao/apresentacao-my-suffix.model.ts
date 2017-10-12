import { BaseEntity } from './../../shared';

export class ApresentacaoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public data?: any,
        public flgagendamentoaprovado?: boolean,
        public bancaId?: number,
    ) {
        this.flgagendamentoaprovado = false;
    }
}

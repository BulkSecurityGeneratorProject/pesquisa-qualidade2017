import { BaseEntity } from './../../shared';

export class Aluno implements BaseEntity {
    constructor(
        public id?: number,
        public artigoId?: number,
        public propostaTeseId?: number,
        public userId?: number,
        public orientadors?: BaseEntity[],
        public coOrientadorId?: number,
    ) {
    }
}

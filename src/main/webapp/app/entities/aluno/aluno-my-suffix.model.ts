import { BaseEntity } from './../../shared';

export class AlunoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public artigoId?: number,
        public propostaTeseId?: number,
        public orientadors?: BaseEntity[],
        public coOrientadorId?: number,
    ) {
    }
}

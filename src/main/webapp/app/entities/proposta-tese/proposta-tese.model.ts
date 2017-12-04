import { BaseEntity } from './../../shared';

export class PropostaTese implements BaseEntity {
    constructor(
        public id?: number,
        public tema?: string,
        public descricao?: string,
        public flgaprovado?: boolean,
        public link?: string,
        public apresentacaoId?: number,
        public alunoId?: number,
        public userId?: number,
    ) {
        this.flgaprovado = false;
    }
}

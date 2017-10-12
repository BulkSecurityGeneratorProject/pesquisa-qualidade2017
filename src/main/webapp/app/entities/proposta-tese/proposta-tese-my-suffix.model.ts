import { BaseEntity } from './../../shared';

export class PropostaTeseMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public tema?: string,
        public descricao?: string,
        public flgaprovado?: string,
        public link?: string,
        public apresentacaoId?: number,
        public alunos?: BaseEntity[],
    ) {
    }
}

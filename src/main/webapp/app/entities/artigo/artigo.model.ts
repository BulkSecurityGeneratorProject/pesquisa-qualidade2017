import { BaseEntity } from './../../shared';

export class Artigo implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public titulo?: string,
        public datapublicacao?: any,
        public link?: string,
        public flgrelacionadopesquisa?: boolean,
        public alunos?: BaseEntity[],
    ) {
        this.flgrelacionadopesquisa = false;
    }
}

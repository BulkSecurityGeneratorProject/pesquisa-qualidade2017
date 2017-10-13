import { BaseEntity } from './../../shared';

export class Banca implements BaseEntity {
    constructor(
        public id?: number,
        public flgaprovadasecretaria?: boolean,
        public professorBancaId?: number,
    ) {
        this.flgaprovadasecretaria = false;
    }
}

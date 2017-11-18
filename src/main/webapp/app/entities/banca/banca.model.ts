import { BaseEntity } from './../../shared';

export class Banca implements BaseEntity {
    constructor(
        public id?: number,
        public flgaprovadasecretaria?: boolean,
    ) {
        this.flgaprovadasecretaria = false;
    }
}

import { BaseEntity } from './../../shared';

export class Banca implements BaseEntity {
    constructor(
        public id?: number,
        public flgaprovadasecretaria?: boolean,
        public professoresDTO?: {}
    ) {
        this.flgaprovadasecretaria = false;
    }
}

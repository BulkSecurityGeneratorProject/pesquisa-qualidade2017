import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    AlunoMySuffixService,
    AlunoMySuffixPopupService,
    AlunoMySuffixComponent,
    AlunoMySuffixDetailComponent,
    AlunoMySuffixDialogComponent,
    AlunoMySuffixPopupComponent,
    AlunoMySuffixDeletePopupComponent,
    AlunoMySuffixDeleteDialogComponent,
    alunoRoute,
    alunoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...alunoRoute,
    ...alunoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AlunoMySuffixComponent,
        AlunoMySuffixDetailComponent,
        AlunoMySuffixDialogComponent,
        AlunoMySuffixDeleteDialogComponent,
        AlunoMySuffixPopupComponent,
        AlunoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AlunoMySuffixComponent,
        AlunoMySuffixDialogComponent,
        AlunoMySuffixPopupComponent,
        AlunoMySuffixDeleteDialogComponent,
        AlunoMySuffixDeletePopupComponent,
    ],
    providers: [
        AlunoMySuffixService,
        AlunoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAlunoMySuffixModule {}

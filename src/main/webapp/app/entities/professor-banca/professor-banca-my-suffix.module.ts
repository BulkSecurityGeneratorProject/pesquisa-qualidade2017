import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ProfessorBancaMySuffixService,
    ProfessorBancaMySuffixPopupService,
    ProfessorBancaMySuffixComponent,
    ProfessorBancaMySuffixDetailComponent,
    ProfessorBancaMySuffixDialogComponent,
    ProfessorBancaMySuffixPopupComponent,
    ProfessorBancaMySuffixDeletePopupComponent,
    ProfessorBancaMySuffixDeleteDialogComponent,
    professorBancaRoute,
    professorBancaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...professorBancaRoute,
    ...professorBancaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProfessorBancaMySuffixComponent,
        ProfessorBancaMySuffixDetailComponent,
        ProfessorBancaMySuffixDialogComponent,
        ProfessorBancaMySuffixDeleteDialogComponent,
        ProfessorBancaMySuffixPopupComponent,
        ProfessorBancaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProfessorBancaMySuffixComponent,
        ProfessorBancaMySuffixDialogComponent,
        ProfessorBancaMySuffixPopupComponent,
        ProfessorBancaMySuffixDeleteDialogComponent,
        ProfessorBancaMySuffixDeletePopupComponent,
    ],
    providers: [
        ProfessorBancaMySuffixService,
        ProfessorBancaMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterProfessorBancaMySuffixModule {}

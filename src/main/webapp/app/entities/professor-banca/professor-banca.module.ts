import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ProfessorBancaService,
    ProfessorBancaPopupService,
    ProfessorBancaComponent,
    ProfessorBancaDetailComponent,
    ProfessorBancaDialogComponent,
    ProfessorBancaPopupComponent,
    ProfessorBancaDeletePopupComponent,
    ProfessorBancaDeleteDialogComponent,
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
        ProfessorBancaComponent,
        ProfessorBancaDetailComponent,
        ProfessorBancaDialogComponent,
        ProfessorBancaDeleteDialogComponent,
        ProfessorBancaPopupComponent,
        ProfessorBancaDeletePopupComponent,
    ],
    entryComponents: [
        ProfessorBancaComponent,
        ProfessorBancaDialogComponent,
        ProfessorBancaPopupComponent,
        ProfessorBancaDeleteDialogComponent,
        ProfessorBancaDeletePopupComponent,
    ],
    providers: [
        ProfessorBancaService,
        ProfessorBancaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterProfessorBancaModule {}

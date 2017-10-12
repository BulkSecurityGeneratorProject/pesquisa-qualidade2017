import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ProfessorMySuffixService,
    ProfessorMySuffixPopupService,
    ProfessorMySuffixComponent,
    ProfessorMySuffixDetailComponent,
    ProfessorMySuffixDialogComponent,
    ProfessorMySuffixPopupComponent,
    ProfessorMySuffixDeletePopupComponent,
    ProfessorMySuffixDeleteDialogComponent,
    professorRoute,
    professorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...professorRoute,
    ...professorPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProfessorMySuffixComponent,
        ProfessorMySuffixDetailComponent,
        ProfessorMySuffixDialogComponent,
        ProfessorMySuffixDeleteDialogComponent,
        ProfessorMySuffixPopupComponent,
        ProfessorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProfessorMySuffixComponent,
        ProfessorMySuffixDialogComponent,
        ProfessorMySuffixPopupComponent,
        ProfessorMySuffixDeleteDialogComponent,
        ProfessorMySuffixDeletePopupComponent,
    ],
    providers: [
        ProfessorMySuffixService,
        ProfessorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterProfessorMySuffixModule {}

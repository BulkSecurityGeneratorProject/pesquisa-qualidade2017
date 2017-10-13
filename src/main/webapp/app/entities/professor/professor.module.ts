import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import { JhipsterAdminModule } from '../../admin/admin.module';
import {
    ProfessorService,
    ProfessorPopupService,
    ProfessorComponent,
    ProfessorDetailComponent,
    ProfessorDialogComponent,
    ProfessorPopupComponent,
    ProfessorDeletePopupComponent,
    ProfessorDeleteDialogComponent,
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
        JhipsterAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProfessorComponent,
        ProfessorDetailComponent,
        ProfessorDialogComponent,
        ProfessorDeleteDialogComponent,
        ProfessorPopupComponent,
        ProfessorDeletePopupComponent,
    ],
    entryComponents: [
        ProfessorComponent,
        ProfessorDialogComponent,
        ProfessorPopupComponent,
        ProfessorDeleteDialogComponent,
        ProfessorDeletePopupComponent,
    ],
    providers: [
        ProfessorService,
        ProfessorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterProfessorModule {}

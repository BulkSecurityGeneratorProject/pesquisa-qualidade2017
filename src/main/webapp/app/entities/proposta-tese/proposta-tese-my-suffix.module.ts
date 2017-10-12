import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    PropostaTeseMySuffixService,
    PropostaTeseMySuffixPopupService,
    PropostaTeseMySuffixComponent,
    PropostaTeseMySuffixDetailComponent,
    PropostaTeseMySuffixDialogComponent,
    PropostaTeseMySuffixPopupComponent,
    PropostaTeseMySuffixDeletePopupComponent,
    PropostaTeseMySuffixDeleteDialogComponent,
    propostaTeseRoute,
    propostaTesePopupRoute,
} from './';

const ENTITY_STATES = [
    ...propostaTeseRoute,
    ...propostaTesePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PropostaTeseMySuffixComponent,
        PropostaTeseMySuffixDetailComponent,
        PropostaTeseMySuffixDialogComponent,
        PropostaTeseMySuffixDeleteDialogComponent,
        PropostaTeseMySuffixPopupComponent,
        PropostaTeseMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PropostaTeseMySuffixComponent,
        PropostaTeseMySuffixDialogComponent,
        PropostaTeseMySuffixPopupComponent,
        PropostaTeseMySuffixDeleteDialogComponent,
        PropostaTeseMySuffixDeletePopupComponent,
    ],
    providers: [
        PropostaTeseMySuffixService,
        PropostaTeseMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterPropostaTeseMySuffixModule {}

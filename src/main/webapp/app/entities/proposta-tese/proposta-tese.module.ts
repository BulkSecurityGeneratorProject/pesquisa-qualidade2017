import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    PropostaTeseService,
    PropostaTesePopupService,
    PropostaTeseComponent,
    PropostaTeseDetailComponent,
    PropostaTeseDialogComponent,
    PropostaTesePopupComponent,
    PropostaTeseDeletePopupComponent,
    PropostaTeseDeleteDialogComponent,
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
        PropostaTeseComponent,
        PropostaTeseDetailComponent,
        PropostaTeseDialogComponent,
        PropostaTeseDeleteDialogComponent,
        PropostaTesePopupComponent,
        PropostaTeseDeletePopupComponent,
    ],
    entryComponents: [
        PropostaTeseComponent,
        PropostaTeseDialogComponent,
        PropostaTesePopupComponent,
        PropostaTeseDeleteDialogComponent,
        PropostaTeseDeletePopupComponent,
    ],
    providers: [
        PropostaTeseService,
        PropostaTesePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterPropostaTeseModule {}

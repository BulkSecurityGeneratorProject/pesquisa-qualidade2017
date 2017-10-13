import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    CoOrientadorService,
    CoOrientadorPopupService,
    CoOrientadorComponent,
    CoOrientadorDetailComponent,
    CoOrientadorDialogComponent,
    CoOrientadorPopupComponent,
    CoOrientadorDeletePopupComponent,
    CoOrientadorDeleteDialogComponent,
    coOrientadorRoute,
    coOrientadorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...coOrientadorRoute,
    ...coOrientadorPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CoOrientadorComponent,
        CoOrientadorDetailComponent,
        CoOrientadorDialogComponent,
        CoOrientadorDeleteDialogComponent,
        CoOrientadorPopupComponent,
        CoOrientadorDeletePopupComponent,
    ],
    entryComponents: [
        CoOrientadorComponent,
        CoOrientadorDialogComponent,
        CoOrientadorPopupComponent,
        CoOrientadorDeleteDialogComponent,
        CoOrientadorDeletePopupComponent,
    ],
    providers: [
        CoOrientadorService,
        CoOrientadorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCoOrientadorModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    TeseService,
    TesePopupService,
    TeseComponent,
    TeseDetailComponent,
    TeseDialogComponent,
    TesePopupComponent,
    TeseDeletePopupComponent,
    TeseDeleteDialogComponent,
    teseRoute,
    tesePopupRoute,
} from './';

const ENTITY_STATES = [
    ...teseRoute,
    ...tesePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TeseComponent,
        TeseDetailComponent,
        TeseDialogComponent,
        TeseDeleteDialogComponent,
        TesePopupComponent,
        TeseDeletePopupComponent,
    ],
    entryComponents: [
        TeseComponent,
        TeseDialogComponent,
        TesePopupComponent,
        TeseDeleteDialogComponent,
        TeseDeletePopupComponent,
    ],
    providers: [
        TeseService,
        TesePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTeseModule {}

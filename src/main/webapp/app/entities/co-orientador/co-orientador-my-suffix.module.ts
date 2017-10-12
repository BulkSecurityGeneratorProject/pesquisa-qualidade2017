import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    CoOrientadorMySuffixService,
    CoOrientadorMySuffixPopupService,
    CoOrientadorMySuffixComponent,
    CoOrientadorMySuffixDetailComponent,
    CoOrientadorMySuffixDialogComponent,
    CoOrientadorMySuffixPopupComponent,
    CoOrientadorMySuffixDeletePopupComponent,
    CoOrientadorMySuffixDeleteDialogComponent,
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
        CoOrientadorMySuffixComponent,
        CoOrientadorMySuffixDetailComponent,
        CoOrientadorMySuffixDialogComponent,
        CoOrientadorMySuffixDeleteDialogComponent,
        CoOrientadorMySuffixPopupComponent,
        CoOrientadorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CoOrientadorMySuffixComponent,
        CoOrientadorMySuffixDialogComponent,
        CoOrientadorMySuffixPopupComponent,
        CoOrientadorMySuffixDeleteDialogComponent,
        CoOrientadorMySuffixDeletePopupComponent,
    ],
    providers: [
        CoOrientadorMySuffixService,
        CoOrientadorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCoOrientadorMySuffixModule {}

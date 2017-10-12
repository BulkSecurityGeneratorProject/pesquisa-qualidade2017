import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    TeseMySuffixService,
    TeseMySuffixPopupService,
    TeseMySuffixComponent,
    TeseMySuffixDetailComponent,
    TeseMySuffixDialogComponent,
    TeseMySuffixPopupComponent,
    TeseMySuffixDeletePopupComponent,
    TeseMySuffixDeleteDialogComponent,
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
        TeseMySuffixComponent,
        TeseMySuffixDetailComponent,
        TeseMySuffixDialogComponent,
        TeseMySuffixDeleteDialogComponent,
        TeseMySuffixPopupComponent,
        TeseMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TeseMySuffixComponent,
        TeseMySuffixDialogComponent,
        TeseMySuffixPopupComponent,
        TeseMySuffixDeleteDialogComponent,
        TeseMySuffixDeletePopupComponent,
    ],
    providers: [
        TeseMySuffixService,
        TeseMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTeseMySuffixModule {}

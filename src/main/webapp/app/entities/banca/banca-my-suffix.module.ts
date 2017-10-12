import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    BancaMySuffixService,
    BancaMySuffixPopupService,
    BancaMySuffixComponent,
    BancaMySuffixDetailComponent,
    BancaMySuffixDialogComponent,
    BancaMySuffixPopupComponent,
    BancaMySuffixDeletePopupComponent,
    BancaMySuffixDeleteDialogComponent,
    bancaRoute,
    bancaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bancaRoute,
    ...bancaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BancaMySuffixComponent,
        BancaMySuffixDetailComponent,
        BancaMySuffixDialogComponent,
        BancaMySuffixDeleteDialogComponent,
        BancaMySuffixPopupComponent,
        BancaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BancaMySuffixComponent,
        BancaMySuffixDialogComponent,
        BancaMySuffixPopupComponent,
        BancaMySuffixDeleteDialogComponent,
        BancaMySuffixDeletePopupComponent,
    ],
    providers: [
        BancaMySuffixService,
        BancaMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterBancaMySuffixModule {}

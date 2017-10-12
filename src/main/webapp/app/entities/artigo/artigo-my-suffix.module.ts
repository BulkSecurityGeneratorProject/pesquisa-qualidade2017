import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ArtigoMySuffixService,
    ArtigoMySuffixPopupService,
    ArtigoMySuffixComponent,
    ArtigoMySuffixDetailComponent,
    ArtigoMySuffixDialogComponent,
    ArtigoMySuffixPopupComponent,
    ArtigoMySuffixDeletePopupComponent,
    ArtigoMySuffixDeleteDialogComponent,
    artigoRoute,
    artigoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...artigoRoute,
    ...artigoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ArtigoMySuffixComponent,
        ArtigoMySuffixDetailComponent,
        ArtigoMySuffixDialogComponent,
        ArtigoMySuffixDeleteDialogComponent,
        ArtigoMySuffixPopupComponent,
        ArtigoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ArtigoMySuffixComponent,
        ArtigoMySuffixDialogComponent,
        ArtigoMySuffixPopupComponent,
        ArtigoMySuffixDeleteDialogComponent,
        ArtigoMySuffixDeletePopupComponent,
    ],
    providers: [
        ArtigoMySuffixService,
        ArtigoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterArtigoMySuffixModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    AreaPesquisaMySuffixService,
    AreaPesquisaMySuffixPopupService,
    AreaPesquisaMySuffixComponent,
    AreaPesquisaMySuffixDetailComponent,
    AreaPesquisaMySuffixDialogComponent,
    AreaPesquisaMySuffixPopupComponent,
    AreaPesquisaMySuffixDeletePopupComponent,
    AreaPesquisaMySuffixDeleteDialogComponent,
    areaPesquisaRoute,
    areaPesquisaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...areaPesquisaRoute,
    ...areaPesquisaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AreaPesquisaMySuffixComponent,
        AreaPesquisaMySuffixDetailComponent,
        AreaPesquisaMySuffixDialogComponent,
        AreaPesquisaMySuffixDeleteDialogComponent,
        AreaPesquisaMySuffixPopupComponent,
        AreaPesquisaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AreaPesquisaMySuffixComponent,
        AreaPesquisaMySuffixDialogComponent,
        AreaPesquisaMySuffixPopupComponent,
        AreaPesquisaMySuffixDeleteDialogComponent,
        AreaPesquisaMySuffixDeletePopupComponent,
    ],
    providers: [
        AreaPesquisaMySuffixService,
        AreaPesquisaMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAreaPesquisaMySuffixModule {}

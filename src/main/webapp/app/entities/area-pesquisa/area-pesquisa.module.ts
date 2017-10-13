import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    AreaPesquisaService,
    AreaPesquisaPopupService,
    AreaPesquisaComponent,
    AreaPesquisaDetailComponent,
    AreaPesquisaDialogComponent,
    AreaPesquisaPopupComponent,
    AreaPesquisaDeletePopupComponent,
    AreaPesquisaDeleteDialogComponent,
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
        AreaPesquisaComponent,
        AreaPesquisaDetailComponent,
        AreaPesquisaDialogComponent,
        AreaPesquisaDeleteDialogComponent,
        AreaPesquisaPopupComponent,
        AreaPesquisaDeletePopupComponent,
    ],
    entryComponents: [
        AreaPesquisaComponent,
        AreaPesquisaDialogComponent,
        AreaPesquisaPopupComponent,
        AreaPesquisaDeleteDialogComponent,
        AreaPesquisaDeletePopupComponent,
    ],
    providers: [
        AreaPesquisaService,
        AreaPesquisaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAreaPesquisaModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ApresentacaoService,
    ApresentacaoPopupService,
    ApresentacaoComponent,
    ApresentacaoDetailComponent,
    ApresentacaoDialogComponent,
    ApresentacaoPopupComponent,
    ApresentacaoDeletePopupComponent,
    ApresentacaoDeleteDialogComponent,
    apresentacaoRoute,
    apresentacaoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...apresentacaoRoute,
    ...apresentacaoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ApresentacaoComponent,
        ApresentacaoDetailComponent,
        ApresentacaoDialogComponent,
        ApresentacaoDeleteDialogComponent,
        ApresentacaoPopupComponent,
        ApresentacaoDeletePopupComponent,
    ],
    entryComponents: [
        ApresentacaoComponent,
        ApresentacaoDialogComponent,
        ApresentacaoPopupComponent,
        ApresentacaoDeleteDialogComponent,
        ApresentacaoDeletePopupComponent,
    ],
    providers: [
        ApresentacaoService,
        ApresentacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApresentacaoModule {}

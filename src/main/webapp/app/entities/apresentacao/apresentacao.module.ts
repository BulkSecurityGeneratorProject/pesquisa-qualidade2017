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
    ApresentacaoAceitarPopupComponent,
    ApresentacaoRecusarPopupComponent,
    ApresentacaoDeleteDialogComponent,
    ApresentacaoStatusDialogComponent,
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
        ApresentacaoStatusDialogComponent,
        ApresentacaoAceitarPopupComponent,
        ApresentacaoRecusarPopupComponent,
    ],
    entryComponents: [
        ApresentacaoComponent,
        ApresentacaoDialogComponent,
        ApresentacaoPopupComponent,
        ApresentacaoDeleteDialogComponent,
        ApresentacaoDeletePopupComponent,
        ApresentacaoStatusDialogComponent,
        ApresentacaoAceitarPopupComponent,
        ApresentacaoRecusarPopupComponent,
    ],
    providers: [
        ApresentacaoService,
        ApresentacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApresentacaoModule {}

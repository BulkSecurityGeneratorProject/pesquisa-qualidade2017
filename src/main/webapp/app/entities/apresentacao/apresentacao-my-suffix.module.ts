import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ApresentacaoMySuffixService,
    ApresentacaoMySuffixPopupService,
    ApresentacaoMySuffixComponent,
    ApresentacaoMySuffixDetailComponent,
    ApresentacaoMySuffixDialogComponent,
    ApresentacaoMySuffixPopupComponent,
    ApresentacaoMySuffixDeletePopupComponent,
    ApresentacaoMySuffixDeleteDialogComponent,
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
        ApresentacaoMySuffixComponent,
        ApresentacaoMySuffixDetailComponent,
        ApresentacaoMySuffixDialogComponent,
        ApresentacaoMySuffixDeleteDialogComponent,
        ApresentacaoMySuffixPopupComponent,
        ApresentacaoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ApresentacaoMySuffixComponent,
        ApresentacaoMySuffixDialogComponent,
        ApresentacaoMySuffixPopupComponent,
        ApresentacaoMySuffixDeleteDialogComponent,
        ApresentacaoMySuffixDeletePopupComponent,
    ],
    providers: [
        ApresentacaoMySuffixService,
        ApresentacaoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApresentacaoMySuffixModule {}

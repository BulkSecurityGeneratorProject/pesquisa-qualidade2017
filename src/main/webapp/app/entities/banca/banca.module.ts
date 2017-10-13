import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    BancaService,
    BancaPopupService,
    BancaComponent,
    BancaDetailComponent,
    BancaDialogComponent,
    BancaPopupComponent,
    BancaDeletePopupComponent,
    BancaDeleteDialogComponent,
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
        BancaComponent,
        BancaDetailComponent,
        BancaDialogComponent,
        BancaDeleteDialogComponent,
        BancaPopupComponent,
        BancaDeletePopupComponent,
    ],
    entryComponents: [
        BancaComponent,
        BancaDialogComponent,
        BancaPopupComponent,
        BancaDeleteDialogComponent,
        BancaDeletePopupComponent,
    ],
    providers: [
        BancaService,
        BancaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterBancaModule {}

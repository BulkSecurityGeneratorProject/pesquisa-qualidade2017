import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ArtigoService,
    ArtigoPopupService,
    ArtigoComponent,
    ArtigoDetailComponent,
    ArtigoDialogComponent,
    ArtigoPopupComponent,
    ArtigoDeletePopupComponent,
    ArtigoDeleteDialogComponent,
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
        ArtigoComponent,
        ArtigoDetailComponent,
        ArtigoDialogComponent,
        ArtigoDeleteDialogComponent,
        ArtigoPopupComponent,
        ArtigoDeletePopupComponent,
    ],
    entryComponents: [
        ArtigoComponent,
        ArtigoDialogComponent,
        ArtigoPopupComponent,
        ArtigoDeleteDialogComponent,
        ArtigoDeletePopupComponent,
    ],
    providers: [
        ArtigoService,
        ArtigoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterArtigoModule {}

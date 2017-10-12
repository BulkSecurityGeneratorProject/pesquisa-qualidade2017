import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    FuncionarioMySuffixService,
    FuncionarioMySuffixPopupService,
    FuncionarioMySuffixComponent,
    FuncionarioMySuffixDetailComponent,
    FuncionarioMySuffixDialogComponent,
    FuncionarioMySuffixPopupComponent,
    FuncionarioMySuffixDeletePopupComponent,
    FuncionarioMySuffixDeleteDialogComponent,
    funcionarioRoute,
    funcionarioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...funcionarioRoute,
    ...funcionarioPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FuncionarioMySuffixComponent,
        FuncionarioMySuffixDetailComponent,
        FuncionarioMySuffixDialogComponent,
        FuncionarioMySuffixDeleteDialogComponent,
        FuncionarioMySuffixPopupComponent,
        FuncionarioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FuncionarioMySuffixComponent,
        FuncionarioMySuffixDialogComponent,
        FuncionarioMySuffixPopupComponent,
        FuncionarioMySuffixDeleteDialogComponent,
        FuncionarioMySuffixDeletePopupComponent,
    ],
    providers: [
        FuncionarioMySuffixService,
        FuncionarioMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterFuncionarioMySuffixModule {}

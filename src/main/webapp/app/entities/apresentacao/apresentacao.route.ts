import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ApresentacaoComponent } from './apresentacao.component';
import { ApresentacaoDetailComponent } from './apresentacao-detail.component';
import { ApresentacaoPopupComponent } from './apresentacao-dialog.component';
import { ApresentacaoDeletePopupComponent } from './apresentacao-delete-dialog.component';

export const apresentacaoRoute: Routes = [
    {
        path: 'apresentacao',
        component: ApresentacaoComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'apresentacao/:id',
        component: ApresentacaoDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const apresentacaoPopupRoute: Routes = [
    {
        path: 'apresentacao-new',
        component: ApresentacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao/:id/edit',
        component: ApresentacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao/:id/delete',
        component: ApresentacaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

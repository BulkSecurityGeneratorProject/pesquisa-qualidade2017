import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ApresentacaoComponent } from './apresentacao.component';
import { ApresentacaoDetailComponent } from './apresentacao-detail.component';
import { ApresentacaoPopupComponent } from './apresentacao-dialog.component';
import { ApresentacaoDeletePopupComponent } from './apresentacao-delete-dialog.component';
import { ApresentacaoAceitarPopupComponent,ApresentacaoRecusarPopupComponent } from './apresentacao-status-dialog.component';

export const apresentacaoRoute: Routes = [
    {
        path: 'apresentacao',
        component: ApresentacaoComponent,
        data: {
            authorities: ['ROLE_USER',  'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'apresentacao/:id',
        component: ApresentacaoDetailComponent,
        data: {
            authorities: ['ROLE_USER',  'ROLE_PROFESSOR', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const apresentacaoPopupRoute: Routes = [
    {
        path: 'apresentacao-new/:idTeseProposta/:isProposta',
        component: ApresentacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao/:id/edit',
        component: ApresentacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao/:id/delete',
        component: ApresentacaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao/:id/aceitar',
        component: ApresentacaoAceitarPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao/:id/recusar',
        component: ApresentacaoRecusarPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

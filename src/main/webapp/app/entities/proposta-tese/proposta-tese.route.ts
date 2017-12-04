import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PropostaTeseComponent } from './proposta-tese.component';
import { PropostaTeseDetailComponent } from './proposta-tese-detail.component';
import { PropostaTesePopupComponent } from './proposta-tese-dialog.component';
import { PropostaTeseDeletePopupComponent } from './proposta-tese-delete-dialog.component';

export const propostaTeseRoute: Routes = [
    {
        path: 'proposta-tese',
        component: PropostaTeseComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proposta-tese/:id',
        component: PropostaTeseDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const propostaTesePopupRoute: Routes = [
    {
        path: 'proposta-tese-new/:userId',
        component: PropostaTesePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proposta-tese/:id/edit',
        component: PropostaTesePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proposta-tese/:id/delete',
        component: PropostaTeseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TeseComponent } from './tese.component';
import { TeseDetailComponent } from './tese-detail.component';
import { TesePopupComponent } from './tese-dialog.component';
import { TeseDeletePopupComponent } from './tese-delete-dialog.component';

export const teseRoute: Routes = [
    {
        path: 'tese',
        component: TeseComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tese/:id',
        component: TeseDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tesePopupRoute: Routes = [
    {
        path: 'tese-new',
        component: TesePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tese/:id/edit',
        component: TesePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tese/:id/delete',
        component: TeseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BancaComponent } from './banca.component';
import { BancaDetailComponent } from './banca-detail.component';
import { BancaPopupComponent } from './banca-dialog.component';
import { BancaDeletePopupComponent } from './banca-delete-dialog.component';

export const bancaRoute: Routes = [
    {
        path: 'banca',
        component: BancaComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banca/:id',
        component: BancaDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bancaPopupRoute: Routes = [
    {
        path: 'banca-new',
        component: BancaPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banca/:id/edit',
        component: BancaPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banca/:id/delete',
        component: BancaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR', 'ROLE_SECRETARIA'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

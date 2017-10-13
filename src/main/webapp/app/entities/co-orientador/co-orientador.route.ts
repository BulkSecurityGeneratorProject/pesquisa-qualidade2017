import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CoOrientadorComponent } from './co-orientador.component';
import { CoOrientadorDetailComponent } from './co-orientador-detail.component';
import { CoOrientadorPopupComponent } from './co-orientador-dialog.component';
import { CoOrientadorDeletePopupComponent } from './co-orientador-delete-dialog.component';

export const coOrientadorRoute: Routes = [
    {
        path: 'co-orientador',
        component: CoOrientadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'co-orientador/:id',
        component: CoOrientadorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coOrientadorPopupRoute: Routes = [
    {
        path: 'co-orientador-new',
        component: CoOrientadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'co-orientador/:id/edit',
        component: CoOrientadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'co-orientador/:id/delete',
        component: CoOrientadorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

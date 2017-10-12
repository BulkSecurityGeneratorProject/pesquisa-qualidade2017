import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CoOrientadorMySuffixComponent } from './co-orientador-my-suffix.component';
import { CoOrientadorMySuffixDetailComponent } from './co-orientador-my-suffix-detail.component';
import { CoOrientadorMySuffixPopupComponent } from './co-orientador-my-suffix-dialog.component';
import { CoOrientadorMySuffixDeletePopupComponent } from './co-orientador-my-suffix-delete-dialog.component';

export const coOrientadorRoute: Routes = [
    {
        path: 'co-orientador-my-suffix',
        component: CoOrientadorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'co-orientador-my-suffix/:id',
        component: CoOrientadorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coOrientadorPopupRoute: Routes = [
    {
        path: 'co-orientador-my-suffix-new',
        component: CoOrientadorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'co-orientador-my-suffix/:id/edit',
        component: CoOrientadorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'co-orientador-my-suffix/:id/delete',
        component: CoOrientadorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.coOrientador.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

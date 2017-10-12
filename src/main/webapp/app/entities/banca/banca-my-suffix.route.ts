import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BancaMySuffixComponent } from './banca-my-suffix.component';
import { BancaMySuffixDetailComponent } from './banca-my-suffix-detail.component';
import { BancaMySuffixPopupComponent } from './banca-my-suffix-dialog.component';
import { BancaMySuffixDeletePopupComponent } from './banca-my-suffix-delete-dialog.component';

export const bancaRoute: Routes = [
    {
        path: 'banca-my-suffix',
        component: BancaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banca-my-suffix/:id',
        component: BancaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bancaPopupRoute: Routes = [
    {
        path: 'banca-my-suffix-new',
        component: BancaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banca-my-suffix/:id/edit',
        component: BancaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banca-my-suffix/:id/delete',
        component: BancaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.banca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

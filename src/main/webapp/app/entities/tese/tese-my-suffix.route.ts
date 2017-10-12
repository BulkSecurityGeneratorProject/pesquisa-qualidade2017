import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TeseMySuffixComponent } from './tese-my-suffix.component';
import { TeseMySuffixDetailComponent } from './tese-my-suffix-detail.component';
import { TeseMySuffixPopupComponent } from './tese-my-suffix-dialog.component';
import { TeseMySuffixDeletePopupComponent } from './tese-my-suffix-delete-dialog.component';

export const teseRoute: Routes = [
    {
        path: 'tese-my-suffix',
        component: TeseMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tese-my-suffix/:id',
        component: TeseMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tesePopupRoute: Routes = [
    {
        path: 'tese-my-suffix-new',
        component: TeseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tese-my-suffix/:id/edit',
        component: TeseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tese-my-suffix/:id/delete',
        component: TeseMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

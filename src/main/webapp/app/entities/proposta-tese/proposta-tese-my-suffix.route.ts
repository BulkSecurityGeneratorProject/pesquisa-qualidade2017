import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PropostaTeseMySuffixComponent } from './proposta-tese-my-suffix.component';
import { PropostaTeseMySuffixDetailComponent } from './proposta-tese-my-suffix-detail.component';
import { PropostaTeseMySuffixPopupComponent } from './proposta-tese-my-suffix-dialog.component';
import { PropostaTeseMySuffixDeletePopupComponent } from './proposta-tese-my-suffix-delete-dialog.component';

export const propostaTeseRoute: Routes = [
    {
        path: 'proposta-tese-my-suffix',
        component: PropostaTeseMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proposta-tese-my-suffix/:id',
        component: PropostaTeseMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const propostaTesePopupRoute: Routes = [
    {
        path: 'proposta-tese-my-suffix-new',
        component: PropostaTeseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proposta-tese-my-suffix/:id/edit',
        component: PropostaTeseMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proposta-tese-my-suffix/:id/delete',
        component: PropostaTeseMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propostaTese.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

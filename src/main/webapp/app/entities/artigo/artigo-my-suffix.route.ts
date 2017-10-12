import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ArtigoMySuffixComponent } from './artigo-my-suffix.component';
import { ArtigoMySuffixDetailComponent } from './artigo-my-suffix-detail.component';
import { ArtigoMySuffixPopupComponent } from './artigo-my-suffix-dialog.component';
import { ArtigoMySuffixDeletePopupComponent } from './artigo-my-suffix-delete-dialog.component';

export const artigoRoute: Routes = [
    {
        path: 'artigo-my-suffix',
        component: ArtigoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'artigo-my-suffix/:id',
        component: ArtigoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const artigoPopupRoute: Routes = [
    {
        path: 'artigo-my-suffix-new',
        component: ArtigoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artigo-my-suffix/:id/edit',
        component: ArtigoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artigo-my-suffix/:id/delete',
        component: ArtigoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

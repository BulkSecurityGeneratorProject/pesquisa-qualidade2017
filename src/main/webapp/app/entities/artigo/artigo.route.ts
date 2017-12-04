import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ArtigoComponent } from './artigo.component';
import { ArtigoDetailComponent } from './artigo-detail.component';
import { ArtigoPopupComponent } from './artigo-dialog.component';
import { ArtigoDeletePopupComponent } from './artigo-delete-dialog.component';

export const artigoRoute: Routes = [
    {
        path: 'artigo',
        component: ArtigoComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'artigo/:id',
        component: ArtigoDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const artigoPopupRoute: Routes = [
    {
        path: 'artigo-new/:userId',
        component: ArtigoPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artigo/:id/edit',
        component: ArtigoPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artigo/:id/delete',
        component: ArtigoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ALUNO'],
            pageTitle: 'jhipsterApp.artigo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

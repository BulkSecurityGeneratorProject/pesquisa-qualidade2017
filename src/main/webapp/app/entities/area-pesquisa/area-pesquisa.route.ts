import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AreaPesquisaComponent } from './area-pesquisa.component';
import { AreaPesquisaDetailComponent } from './area-pesquisa-detail.component';
import { AreaPesquisaPopupComponent } from './area-pesquisa-dialog.component';
import { AreaPesquisaDeletePopupComponent } from './area-pesquisa-delete-dialog.component';

export const areaPesquisaRoute: Routes = [
    {
        path: 'area-pesquisa',
        component: AreaPesquisaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'area-pesquisa/:id',
        component: AreaPesquisaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const areaPesquisaPopupRoute: Routes = [
    {
        path: 'area-pesquisa-new',
        component: AreaPesquisaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-pesquisa/:id/edit',
        component: AreaPesquisaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-pesquisa/:id/delete',
        component: AreaPesquisaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

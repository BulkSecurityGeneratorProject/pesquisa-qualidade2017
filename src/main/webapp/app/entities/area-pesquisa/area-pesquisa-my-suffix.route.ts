import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AreaPesquisaMySuffixComponent } from './area-pesquisa-my-suffix.component';
import { AreaPesquisaMySuffixDetailComponent } from './area-pesquisa-my-suffix-detail.component';
import { AreaPesquisaMySuffixPopupComponent } from './area-pesquisa-my-suffix-dialog.component';
import { AreaPesquisaMySuffixDeletePopupComponent } from './area-pesquisa-my-suffix-delete-dialog.component';

export const areaPesquisaRoute: Routes = [
    {
        path: 'area-pesquisa-my-suffix',
        component: AreaPesquisaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'area-pesquisa-my-suffix/:id',
        component: AreaPesquisaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const areaPesquisaPopupRoute: Routes = [
    {
        path: 'area-pesquisa-my-suffix-new',
        component: AreaPesquisaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-pesquisa-my-suffix/:id/edit',
        component: AreaPesquisaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-pesquisa-my-suffix/:id/delete',
        component: AreaPesquisaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.areaPesquisa.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

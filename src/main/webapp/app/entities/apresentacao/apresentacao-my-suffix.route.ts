import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ApresentacaoMySuffixComponent } from './apresentacao-my-suffix.component';
import { ApresentacaoMySuffixDetailComponent } from './apresentacao-my-suffix-detail.component';
import { ApresentacaoMySuffixPopupComponent } from './apresentacao-my-suffix-dialog.component';
import { ApresentacaoMySuffixDeletePopupComponent } from './apresentacao-my-suffix-delete-dialog.component';

export const apresentacaoRoute: Routes = [
    {
        path: 'apresentacao-my-suffix',
        component: ApresentacaoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'apresentacao-my-suffix/:id',
        component: ApresentacaoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const apresentacaoPopupRoute: Routes = [
    {
        path: 'apresentacao-my-suffix-new',
        component: ApresentacaoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao-my-suffix/:id/edit',
        component: ApresentacaoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'apresentacao-my-suffix/:id/delete',
        component: ApresentacaoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.apresentacao.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

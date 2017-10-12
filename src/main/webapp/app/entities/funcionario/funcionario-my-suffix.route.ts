import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FuncionarioMySuffixComponent } from './funcionario-my-suffix.component';
import { FuncionarioMySuffixDetailComponent } from './funcionario-my-suffix-detail.component';
import { FuncionarioMySuffixPopupComponent } from './funcionario-my-suffix-dialog.component';
import { FuncionarioMySuffixDeletePopupComponent } from './funcionario-my-suffix-delete-dialog.component';

export const funcionarioRoute: Routes = [
    {
        path: 'funcionario-my-suffix',
        component: FuncionarioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'funcionario-my-suffix/:id',
        component: FuncionarioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const funcionarioPopupRoute: Routes = [
    {
        path: 'funcionario-my-suffix-new',
        component: FuncionarioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'funcionario-my-suffix/:id/edit',
        component: FuncionarioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'funcionario-my-suffix/:id/delete',
        component: FuncionarioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

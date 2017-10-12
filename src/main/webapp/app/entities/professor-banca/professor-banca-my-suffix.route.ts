import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProfessorBancaMySuffixComponent } from './professor-banca-my-suffix.component';
import { ProfessorBancaMySuffixDetailComponent } from './professor-banca-my-suffix-detail.component';
import { ProfessorBancaMySuffixPopupComponent } from './professor-banca-my-suffix-dialog.component';
import { ProfessorBancaMySuffixDeletePopupComponent } from './professor-banca-my-suffix-delete-dialog.component';

export const professorBancaRoute: Routes = [
    {
        path: 'professor-banca-my-suffix',
        component: ProfessorBancaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'professor-banca-my-suffix/:id',
        component: ProfessorBancaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professorBancaPopupRoute: Routes = [
    {
        path: 'professor-banca-my-suffix-new',
        component: ProfessorBancaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor-banca-my-suffix/:id/edit',
        component: ProfessorBancaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor-banca-my-suffix/:id/delete',
        component: ProfessorBancaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProfessorBancaComponent } from './professor-banca.component';
import { ProfessorBancaDetailComponent } from './professor-banca-detail.component';
import { ProfessorBancaPopupComponent } from './professor-banca-dialog.component';
import { ProfessorBancaDeletePopupComponent } from './professor-banca-delete-dialog.component';

export const professorBancaRoute: Routes = [
    {
        path: 'professor-banca',
        component: ProfessorBancaComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'professor-banca/:id',
        component: ProfessorBancaDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professorBancaPopupRoute: Routes = [
    {
        path: 'professor-banca-new/:idBanca',
        component: ProfessorBancaPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor-banca/:id/edit',
        component: ProfessorBancaPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor-banca/:id/delete',
        component: ProfessorBancaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_PROFESSOR'],
            pageTitle: 'jhipsterApp.professorBanca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

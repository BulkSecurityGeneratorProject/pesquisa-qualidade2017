import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProfessorMySuffixComponent } from './professor-my-suffix.component';
import { ProfessorMySuffixDetailComponent } from './professor-my-suffix-detail.component';
import { ProfessorMySuffixPopupComponent } from './professor-my-suffix-dialog.component';
import { ProfessorMySuffixDeletePopupComponent } from './professor-my-suffix-delete-dialog.component';

export const professorRoute: Routes = [
    {
        path: 'professor-my-suffix',
        component: ProfessorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'professor-my-suffix/:id',
        component: ProfessorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professorPopupRoute: Routes = [
    {
        path: 'professor-my-suffix-new',
        component: ProfessorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor-my-suffix/:id/edit',
        component: ProfessorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professor-my-suffix/:id/delete',
        component: ProfessorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.professor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

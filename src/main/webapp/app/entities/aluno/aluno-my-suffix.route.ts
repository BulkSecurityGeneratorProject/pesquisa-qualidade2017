import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AlunoMySuffixComponent } from './aluno-my-suffix.component';
import { AlunoMySuffixDetailComponent } from './aluno-my-suffix-detail.component';
import { AlunoMySuffixPopupComponent } from './aluno-my-suffix-dialog.component';
import { AlunoMySuffixDeletePopupComponent } from './aluno-my-suffix-delete-dialog.component';

export const alunoRoute: Routes = [
    {
        path: 'aluno-my-suffix',
        component: AlunoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'aluno-my-suffix/:id',
        component: AlunoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alunoPopupRoute: Routes = [
    {
        path: 'aluno-my-suffix-new',
        component: AlunoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aluno-my-suffix/:id/edit',
        component: AlunoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aluno-my-suffix/:id/delete',
        component: AlunoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.aluno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

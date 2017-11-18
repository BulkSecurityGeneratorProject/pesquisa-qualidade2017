import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Professor } from './professor.model';
import { ProfessorPopupService } from './professor-popup.service';
import { ProfessorService } from './professor.service';
import { AreaPesquisa, AreaPesquisaService } from '../area-pesquisa';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-professor-dialog',
    templateUrl: './professor-dialog.component.html'
})
export class ProfessorDialogComponent implements OnInit {

    professor: Professor;
    isSaving: boolean;

    areas: AreaPesquisa[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private professorService: ProfessorService,
        private areaPesquisaService: AreaPesquisaService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.areaPesquisaService
            .query({filter: 'professor-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.professor.areaId) {
                    this.areas = res.json;
                } else {
                    this.areaPesquisaService
                        .find(this.professor.areaId)
                        .subscribe((subRes: AreaPesquisa) => {
                            this.areas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.professor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professorService.update(this.professor));
        } else {
            this.subscribeToSaveResponse(
                this.professorService.create(this.professor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Professor>) {
        result.subscribe((res: Professor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Professor) {
        this.eventManager.broadcast({ name: 'professorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAreaPesquisaById(index: number, item: AreaPesquisa) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-professor-popup',
    template: ''
})
export class ProfessorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorPopupService: ProfessorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professorPopupService
                    .open(ProfessorDialogComponent as Component, params['id']);
            } else {
                this.professorPopupService
                    .open(ProfessorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

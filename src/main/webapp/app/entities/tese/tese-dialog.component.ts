import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tese } from './tese.model';
import { TesePopupService } from './tese-popup.service';
import { TeseService } from './tese.service';
import { Aluno, AlunoService } from '../aluno';
import { Apresentacao, ApresentacaoService } from '../apresentacao';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tese-dialog',
    templateUrl: './tese-dialog.component.html'
})
export class TeseDialogComponent implements OnInit {

    tese: Tese;
    isSaving: boolean;

    alunos: Aluno[];

    apresentacaos: Apresentacao[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teseService: TeseService,
        private alunoService: AlunoService,
        private apresentacaoService: ApresentacaoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alunoService
            .query({filter: 'tese-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tese.alunoId) {
                    this.alunos = res.json;
                } else {
                    this.alunoService
                        .find(this.tese.alunoId)
                        .subscribe((subRes: Aluno) => {
                            this.alunos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.apresentacaoService
            .query({filter: 'tese-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tese.apresentacaoId) {
                    this.apresentacaos = res.json;
                } else {
                    this.apresentacaoService
                        .find(this.tese.apresentacaoId)
                        .subscribe((subRes: Apresentacao) => {
                            this.apresentacaos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tese.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teseService.update(this.tese));
        } else {
            this.subscribeToSaveResponse(
                this.teseService.create(this.tese));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tese>) {
        result.subscribe((res: Tese) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tese) {
        this.eventManager.broadcast({ name: 'teseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlunoById(index: number, item: Aluno) {
        return item.id;
    }

    trackApresentacaoById(index: number, item: Apresentacao) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tese-popup',
    template: ''
})
export class TesePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tesePopupService: TesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tesePopupService
                    .open(TeseDialogComponent as Component, params['id']);
            } else {
                this.tesePopupService
                    .open(TeseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

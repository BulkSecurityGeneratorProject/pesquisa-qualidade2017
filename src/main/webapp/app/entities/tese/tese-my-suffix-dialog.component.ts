import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TeseMySuffix } from './tese-my-suffix.model';
import { TeseMySuffixPopupService } from './tese-my-suffix-popup.service';
import { TeseMySuffixService } from './tese-my-suffix.service';
import { AlunoMySuffix, AlunoMySuffixService } from '../aluno';
import { ApresentacaoMySuffix, ApresentacaoMySuffixService } from '../apresentacao';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tese-my-suffix-dialog',
    templateUrl: './tese-my-suffix-dialog.component.html'
})
export class TeseMySuffixDialogComponent implements OnInit {

    tese: TeseMySuffix;
    isSaving: boolean;

    alunos: AlunoMySuffix[];

    apresentacaos: ApresentacaoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teseService: TeseMySuffixService,
        private alunoService: AlunoMySuffixService,
        private apresentacaoService: ApresentacaoMySuffixService,
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
                        .subscribe((subRes: AlunoMySuffix) => {
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
                        .subscribe((subRes: ApresentacaoMySuffix) => {
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

    private subscribeToSaveResponse(result: Observable<TeseMySuffix>) {
        result.subscribe((res: TeseMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TeseMySuffix) {
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

    trackAlunoById(index: number, item: AlunoMySuffix) {
        return item.id;
    }

    trackApresentacaoById(index: number, item: ApresentacaoMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tese-my-suffix-popup',
    template: ''
})
export class TeseMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tesePopupService: TeseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tesePopupService
                    .open(TeseMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tesePopupService
                    .open(TeseMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

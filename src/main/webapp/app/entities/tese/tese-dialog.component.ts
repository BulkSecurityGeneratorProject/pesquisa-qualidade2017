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
import { PropostaTese, PropostaTeseService } from '../proposta-tese';
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

    propostatese: PropostaTese[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teseService: TeseService,
        private alunoService: AlunoService,
        private apresentacaoService: ApresentacaoService,
        private propostaTeseService: PropostaTeseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alunoService.query()
            .subscribe((res: ResponseWrapper) => { this.alunos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.propostaTeseService
            .query({filter: 'propostatese-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.tese.propostaTeseId) {
                    this.propostatese = res.json;
                } else {
                    this.propostaTeseService
                        .find(this.tese.propostaTeseId)
                        .subscribe((subRes: PropostaTese) => {
                            this.propostatese = [subRes].concat(res.json);
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

    trackPropostaTeseById(index: number, item: PropostaTese) {
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
            }else if ( params['userId'] ) {
                this.tesePopupService
                    .open(TeseDialogComponent as Component, undefined, params['userId']);
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

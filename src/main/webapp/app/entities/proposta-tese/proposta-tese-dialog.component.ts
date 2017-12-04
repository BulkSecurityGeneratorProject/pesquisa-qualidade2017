import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PropostaTese } from './proposta-tese.model';
import { PropostaTesePopupService } from './proposta-tese-popup.service';
import { PropostaTeseService } from './proposta-tese.service';
import { Apresentacao, ApresentacaoService } from '../apresentacao';
import { Aluno, AlunoService } from '../aluno';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-proposta-tese-dialog',
    templateUrl: './proposta-tese-dialog.component.html'
})
export class PropostaTeseDialogComponent implements OnInit {

    propostaTese: PropostaTese;
    isSaving: boolean;

    apresentacaos: Apresentacao[];

    alunos: Aluno[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private propostaTeseService: PropostaTeseService,
        private apresentacaoService: ApresentacaoService,
        private alunoService: AlunoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        console.log(this.propostaTese);
        this.isSaving = false;
        this.alunoService
            .query({filter: 'propostatese-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.propostaTese.alunoId) {
                    this.alunos = res.json;
                } else {
                    this.alunoService
                        .find(this.propostaTese.alunoId)
                        .subscribe((subRes: Aluno) => {
                            this.alunos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.propostaTese.id !== undefined) {
            this.subscribeToSaveResponse(
                this.propostaTeseService.update(this.propostaTese));
        } else {
            this.subscribeToSaveResponse(
                this.propostaTeseService.create(this.propostaTese));
        }
    }

    private subscribeToSaveResponse(result: Observable<PropostaTese>) {
        result.subscribe((res: PropostaTese) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PropostaTese) {
        this.eventManager.broadcast({ name: 'propostaTeseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackApresentacaoById(index: number, item: Apresentacao) {
        return item.id;
    }

    trackAlunoById(index: number, item: Aluno) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-proposta-tese-popup',
    template: ''
})
export class PropostaTesePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private propostaTesePopupService: PropostaTesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.propostaTesePopupService
                    .open(PropostaTeseDialogComponent as Component, params['id']);
            } else if ( params['userId'] ) {
                this.propostaTesePopupService
                    .open(PropostaTeseDialogComponent as Component, undefined, params['userId']);
            } else {
                this.propostaTesePopupService
                    .open(PropostaTeseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

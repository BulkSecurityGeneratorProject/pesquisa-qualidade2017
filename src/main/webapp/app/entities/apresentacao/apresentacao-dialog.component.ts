import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Apresentacao } from './apresentacao.model';
import { ApresentacaoPopupService } from './apresentacao-popup.service';
import { ApresentacaoService } from './apresentacao.service';
import { Banca, BancaService } from '../banca';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-apresentacao-dialog',
    templateUrl: './apresentacao-dialog.component.html'
})
export class ApresentacaoDialogComponent implements OnInit {

    apresentacao: Apresentacao;
    isSaving: boolean;

    bancas: Banca[];
    dataDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private apresentacaoService: ApresentacaoService,
        private bancaService: BancaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        console.log(this.apresentacao);
        this.isSaving = false;
        this.bancaService
            .query({filter: 'apresentacao-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.apresentacao.bancaId) {
                    this.bancas = res.json;
                } else {
                    this.bancaService
                        .find(this.apresentacao.bancaId)
                        .subscribe((subRes: Banca) => {
                            this.bancas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.apresentacao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.apresentacaoService.update(this.apresentacao));
        } else {
            this.subscribeToSaveResponse(
                this.apresentacaoService.create(this.apresentacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<Apresentacao>) {
        result.subscribe((res: Apresentacao) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Apresentacao) {
        this.eventManager.broadcast({ name: 'apresentacaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBancaById(index: number, item: Banca) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-apresentacao-popup',
    template: ''
})
export class ApresentacaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apresentacaoPopupService: ApresentacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.apresentacaoPopupService
                    .open(ApresentacaoDialogComponent as Component, params['id']);
            } else if ( params['idTeseProposta'] ) {
                this.apresentacaoPopupService
                    .open(ApresentacaoDialogComponent as Component, undefined, params['idTeseProposta'], params['isProposta']);
            } else {
                this.apresentacaoPopupService
                    .open(ApresentacaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

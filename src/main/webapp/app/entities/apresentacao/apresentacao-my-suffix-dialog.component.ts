import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ApresentacaoMySuffix } from './apresentacao-my-suffix.model';
import { ApresentacaoMySuffixPopupService } from './apresentacao-my-suffix-popup.service';
import { ApresentacaoMySuffixService } from './apresentacao-my-suffix.service';
import { BancaMySuffix, BancaMySuffixService } from '../banca';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-apresentacao-my-suffix-dialog',
    templateUrl: './apresentacao-my-suffix-dialog.component.html'
})
export class ApresentacaoMySuffixDialogComponent implements OnInit {

    apresentacao: ApresentacaoMySuffix;
    isSaving: boolean;

    bancas: BancaMySuffix[];
    dataDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private apresentacaoService: ApresentacaoMySuffixService,
        private bancaService: BancaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bancaService
            .query({filter: 'apresentacao-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.apresentacao.bancaId) {
                    this.bancas = res.json;
                } else {
                    this.bancaService
                        .find(this.apresentacao.bancaId)
                        .subscribe((subRes: BancaMySuffix) => {
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

    private subscribeToSaveResponse(result: Observable<ApresentacaoMySuffix>) {
        result.subscribe((res: ApresentacaoMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ApresentacaoMySuffix) {
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

    trackBancaById(index: number, item: BancaMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-apresentacao-my-suffix-popup',
    template: ''
})
export class ApresentacaoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apresentacaoPopupService: ApresentacaoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.apresentacaoPopupService
                    .open(ApresentacaoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.apresentacaoPopupService
                    .open(ApresentacaoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

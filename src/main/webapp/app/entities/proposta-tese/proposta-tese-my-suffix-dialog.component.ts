import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PropostaTeseMySuffix } from './proposta-tese-my-suffix.model';
import { PropostaTeseMySuffixPopupService } from './proposta-tese-my-suffix-popup.service';
import { PropostaTeseMySuffixService } from './proposta-tese-my-suffix.service';
import { ApresentacaoMySuffix, ApresentacaoMySuffixService } from '../apresentacao';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-proposta-tese-my-suffix-dialog',
    templateUrl: './proposta-tese-my-suffix-dialog.component.html'
})
export class PropostaTeseMySuffixDialogComponent implements OnInit {

    propostaTese: PropostaTeseMySuffix;
    isSaving: boolean;

    apresentacaos: ApresentacaoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private propostaTeseService: PropostaTeseMySuffixService,
        private apresentacaoService: ApresentacaoMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.apresentacaoService
            .query({filter: 'propostatese-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.propostaTese.apresentacaoId) {
                    this.apresentacaos = res.json;
                } else {
                    this.apresentacaoService
                        .find(this.propostaTese.apresentacaoId)
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
        if (this.propostaTese.id !== undefined) {
            this.subscribeToSaveResponse(
                this.propostaTeseService.update(this.propostaTese));
        } else {
            this.subscribeToSaveResponse(
                this.propostaTeseService.create(this.propostaTese));
        }
    }

    private subscribeToSaveResponse(result: Observable<PropostaTeseMySuffix>) {
        result.subscribe((res: PropostaTeseMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PropostaTeseMySuffix) {
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

    trackApresentacaoById(index: number, item: ApresentacaoMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-proposta-tese-my-suffix-popup',
    template: ''
})
export class PropostaTeseMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private propostaTesePopupService: PropostaTeseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.propostaTesePopupService
                    .open(PropostaTeseMySuffixDialogComponent as Component, params['id']);
            } else {
                this.propostaTesePopupService
                    .open(PropostaTeseMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

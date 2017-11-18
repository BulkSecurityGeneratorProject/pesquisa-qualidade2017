import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Banca } from './banca.model';
import { BancaPopupService } from './banca-popup.service';
import { BancaService } from './banca.service';

@Component({
    selector: 'jhi-banca-dialog',
    templateUrl: './banca-dialog.component.html'
})
export class BancaDialogComponent implements OnInit {

    banca: Banca;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bancaService: BancaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.banca.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bancaService.update(this.banca));
        } else {
            this.subscribeToSaveResponse(
                this.bancaService.create(this.banca));
        }
    }

    private subscribeToSaveResponse(result: Observable<Banca>) {
        result.subscribe((res: Banca) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Banca) {
        this.eventManager.broadcast({ name: 'bancaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-banca-popup',
    template: ''
})
export class BancaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bancaPopupService: BancaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bancaPopupService
                    .open(BancaDialogComponent as Component, params['id']);
            } else {
                this.bancaPopupService
                    .open(BancaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

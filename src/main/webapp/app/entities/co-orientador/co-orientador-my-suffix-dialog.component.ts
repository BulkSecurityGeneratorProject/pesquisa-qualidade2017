import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CoOrientadorMySuffix } from './co-orientador-my-suffix.model';
import { CoOrientadorMySuffixPopupService } from './co-orientador-my-suffix-popup.service';
import { CoOrientadorMySuffixService } from './co-orientador-my-suffix.service';

@Component({
    selector: 'jhi-co-orientador-my-suffix-dialog',
    templateUrl: './co-orientador-my-suffix-dialog.component.html'
})
export class CoOrientadorMySuffixDialogComponent implements OnInit {

    coOrientador: CoOrientadorMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private coOrientadorService: CoOrientadorMySuffixService,
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
        if (this.coOrientador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.coOrientadorService.update(this.coOrientador));
        } else {
            this.subscribeToSaveResponse(
                this.coOrientadorService.create(this.coOrientador));
        }
    }

    private subscribeToSaveResponse(result: Observable<CoOrientadorMySuffix>) {
        result.subscribe((res: CoOrientadorMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CoOrientadorMySuffix) {
        this.eventManager.broadcast({ name: 'coOrientadorListModification', content: 'OK'});
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
    selector: 'jhi-co-orientador-my-suffix-popup',
    template: ''
})
export class CoOrientadorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coOrientadorPopupService: CoOrientadorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.coOrientadorPopupService
                    .open(CoOrientadorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.coOrientadorPopupService
                    .open(CoOrientadorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

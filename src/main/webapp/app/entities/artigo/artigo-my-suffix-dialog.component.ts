import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ArtigoMySuffix } from './artigo-my-suffix.model';
import { ArtigoMySuffixPopupService } from './artigo-my-suffix-popup.service';
import { ArtigoMySuffixService } from './artigo-my-suffix.service';

@Component({
    selector: 'jhi-artigo-my-suffix-dialog',
    templateUrl: './artigo-my-suffix-dialog.component.html'
})
export class ArtigoMySuffixDialogComponent implements OnInit {

    artigo: ArtigoMySuffix;
    isSaving: boolean;
    datapublicacaoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private artigoService: ArtigoMySuffixService,
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
        if (this.artigo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.artigoService.update(this.artigo));
        } else {
            this.subscribeToSaveResponse(
                this.artigoService.create(this.artigo));
        }
    }

    private subscribeToSaveResponse(result: Observable<ArtigoMySuffix>) {
        result.subscribe((res: ArtigoMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ArtigoMySuffix) {
        this.eventManager.broadcast({ name: 'artigoListModification', content: 'OK'});
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
    selector: 'jhi-artigo-my-suffix-popup',
    template: ''
})
export class ArtigoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artigoPopupService: ArtigoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.artigoPopupService
                    .open(ArtigoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.artigoPopupService
                    .open(ArtigoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

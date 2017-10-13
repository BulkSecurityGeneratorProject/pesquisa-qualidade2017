import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Artigo } from './artigo.model';
import { ArtigoPopupService } from './artigo-popup.service';
import { ArtigoService } from './artigo.service';

@Component({
    selector: 'jhi-artigo-dialog',
    templateUrl: './artigo-dialog.component.html'
})
export class ArtigoDialogComponent implements OnInit {

    artigo: Artigo;
    isSaving: boolean;
    datapublicacaoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private artigoService: ArtigoService,
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

    private subscribeToSaveResponse(result: Observable<Artigo>) {
        result.subscribe((res: Artigo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Artigo) {
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
    selector: 'jhi-artigo-popup',
    template: ''
})
export class ArtigoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artigoPopupService: ArtigoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.artigoPopupService
                    .open(ArtigoDialogComponent as Component, params['id']);
            } else {
                this.artigoPopupService
                    .open(ArtigoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

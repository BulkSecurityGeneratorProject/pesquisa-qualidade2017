import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AreaPesquisaMySuffix } from './area-pesquisa-my-suffix.model';
import { AreaPesquisaMySuffixPopupService } from './area-pesquisa-my-suffix-popup.service';
import { AreaPesquisaMySuffixService } from './area-pesquisa-my-suffix.service';

@Component({
    selector: 'jhi-area-pesquisa-my-suffix-dialog',
    templateUrl: './area-pesquisa-my-suffix-dialog.component.html'
})
export class AreaPesquisaMySuffixDialogComponent implements OnInit {

    areaPesquisa: AreaPesquisaMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private areaPesquisaService: AreaPesquisaMySuffixService,
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
        if (this.areaPesquisa.id !== undefined) {
            this.subscribeToSaveResponse(
                this.areaPesquisaService.update(this.areaPesquisa));
        } else {
            this.subscribeToSaveResponse(
                this.areaPesquisaService.create(this.areaPesquisa));
        }
    }

    private subscribeToSaveResponse(result: Observable<AreaPesquisaMySuffix>) {
        result.subscribe((res: AreaPesquisaMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AreaPesquisaMySuffix) {
        this.eventManager.broadcast({ name: 'areaPesquisaListModification', content: 'OK'});
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
    selector: 'jhi-area-pesquisa-my-suffix-popup',
    template: ''
})
export class AreaPesquisaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPesquisaPopupService: AreaPesquisaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.areaPesquisaPopupService
                    .open(AreaPesquisaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.areaPesquisaPopupService
                    .open(AreaPesquisaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

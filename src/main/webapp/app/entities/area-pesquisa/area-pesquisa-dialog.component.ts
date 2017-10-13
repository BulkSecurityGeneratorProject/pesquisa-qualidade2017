import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AreaPesquisa } from './area-pesquisa.model';
import { AreaPesquisaPopupService } from './area-pesquisa-popup.service';
import { AreaPesquisaService } from './area-pesquisa.service';

@Component({
    selector: 'jhi-area-pesquisa-dialog',
    templateUrl: './area-pesquisa-dialog.component.html'
})
export class AreaPesquisaDialogComponent implements OnInit {

    areaPesquisa: AreaPesquisa;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private areaPesquisaService: AreaPesquisaService,
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

    private subscribeToSaveResponse(result: Observable<AreaPesquisa>) {
        result.subscribe((res: AreaPesquisa) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AreaPesquisa) {
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
    selector: 'jhi-area-pesquisa-popup',
    template: ''
})
export class AreaPesquisaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPesquisaPopupService: AreaPesquisaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.areaPesquisaPopupService
                    .open(AreaPesquisaDialogComponent as Component, params['id']);
            } else {
                this.areaPesquisaPopupService
                    .open(AreaPesquisaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

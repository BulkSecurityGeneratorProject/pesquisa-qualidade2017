import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BancaMySuffix } from './banca-my-suffix.model';
import { BancaMySuffixPopupService } from './banca-my-suffix-popup.service';
import { BancaMySuffixService } from './banca-my-suffix.service';
import { ProfessorBancaMySuffix, ProfessorBancaMySuffixService } from '../professor-banca';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-banca-my-suffix-dialog',
    templateUrl: './banca-my-suffix-dialog.component.html'
})
export class BancaMySuffixDialogComponent implements OnInit {

    banca: BancaMySuffix;
    isSaving: boolean;

    professorbancas: ProfessorBancaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bancaService: BancaMySuffixService,
        private professorBancaService: ProfessorBancaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.professorBancaService.query()
            .subscribe((res: ResponseWrapper) => { this.professorbancas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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

    private subscribeToSaveResponse(result: Observable<BancaMySuffix>) {
        result.subscribe((res: BancaMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BancaMySuffix) {
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

    trackProfessorBancaById(index: number, item: ProfessorBancaMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-banca-my-suffix-popup',
    template: ''
})
export class BancaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bancaPopupService: BancaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bancaPopupService
                    .open(BancaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.bancaPopupService
                    .open(BancaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProfessorBancaMySuffix } from './professor-banca-my-suffix.model';
import { ProfessorBancaMySuffixPopupService } from './professor-banca-my-suffix-popup.service';
import { ProfessorBancaMySuffixService } from './professor-banca-my-suffix.service';

@Component({
    selector: 'jhi-professor-banca-my-suffix-dialog',
    templateUrl: './professor-banca-my-suffix-dialog.component.html'
})
export class ProfessorBancaMySuffixDialogComponent implements OnInit {

    professorBanca: ProfessorBancaMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private professorBancaService: ProfessorBancaMySuffixService,
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
        if (this.professorBanca.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professorBancaService.update(this.professorBanca));
        } else {
            this.subscribeToSaveResponse(
                this.professorBancaService.create(this.professorBanca));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProfessorBancaMySuffix>) {
        result.subscribe((res: ProfessorBancaMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProfessorBancaMySuffix) {
        this.eventManager.broadcast({ name: 'professorBancaListModification', content: 'OK'});
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
    selector: 'jhi-professor-banca-my-suffix-popup',
    template: ''
})
export class ProfessorBancaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorBancaPopupService: ProfessorBancaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professorBancaPopupService
                    .open(ProfessorBancaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.professorBancaPopupService
                    .open(ProfessorBancaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

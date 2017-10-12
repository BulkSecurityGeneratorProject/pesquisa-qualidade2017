import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FuncionarioMySuffix } from './funcionario-my-suffix.model';
import { FuncionarioMySuffixPopupService } from './funcionario-my-suffix-popup.service';
import { FuncionarioMySuffixService } from './funcionario-my-suffix.service';

@Component({
    selector: 'jhi-funcionario-my-suffix-dialog',
    templateUrl: './funcionario-my-suffix-dialog.component.html'
})
export class FuncionarioMySuffixDialogComponent implements OnInit {

    funcionario: FuncionarioMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private funcionarioService: FuncionarioMySuffixService,
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
        if (this.funcionario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.funcionarioService.update(this.funcionario));
        } else {
            this.subscribeToSaveResponse(
                this.funcionarioService.create(this.funcionario));
        }
    }

    private subscribeToSaveResponse(result: Observable<FuncionarioMySuffix>) {
        result.subscribe((res: FuncionarioMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FuncionarioMySuffix) {
        this.eventManager.broadcast({ name: 'funcionarioListModification', content: 'OK'});
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
    selector: 'jhi-funcionario-my-suffix-popup',
    template: ''
})
export class FuncionarioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private funcionarioPopupService: FuncionarioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.funcionarioPopupService
                    .open(FuncionarioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.funcionarioPopupService
                    .open(FuncionarioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

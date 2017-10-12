import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FuncionarioMySuffix } from './funcionario-my-suffix.model';
import { FuncionarioMySuffixPopupService } from './funcionario-my-suffix-popup.service';
import { FuncionarioMySuffixService } from './funcionario-my-suffix.service';

@Component({
    selector: 'jhi-funcionario-my-suffix-delete-dialog',
    templateUrl: './funcionario-my-suffix-delete-dialog.component.html'
})
export class FuncionarioMySuffixDeleteDialogComponent {

    funcionario: FuncionarioMySuffix;

    constructor(
        private funcionarioService: FuncionarioMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.funcionarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'funcionarioListModification',
                content: 'Deleted an funcionario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-funcionario-my-suffix-delete-popup',
    template: ''
})
export class FuncionarioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private funcionarioPopupService: FuncionarioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.funcionarioPopupService
                .open(FuncionarioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

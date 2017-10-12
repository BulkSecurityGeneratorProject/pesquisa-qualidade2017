import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CoOrientadorMySuffix } from './co-orientador-my-suffix.model';
import { CoOrientadorMySuffixPopupService } from './co-orientador-my-suffix-popup.service';
import { CoOrientadorMySuffixService } from './co-orientador-my-suffix.service';

@Component({
    selector: 'jhi-co-orientador-my-suffix-delete-dialog',
    templateUrl: './co-orientador-my-suffix-delete-dialog.component.html'
})
export class CoOrientadorMySuffixDeleteDialogComponent {

    coOrientador: CoOrientadorMySuffix;

    constructor(
        private coOrientadorService: CoOrientadorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.coOrientadorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'coOrientadorListModification',
                content: 'Deleted an coOrientador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-co-orientador-my-suffix-delete-popup',
    template: ''
})
export class CoOrientadorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coOrientadorPopupService: CoOrientadorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.coOrientadorPopupService
                .open(CoOrientadorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

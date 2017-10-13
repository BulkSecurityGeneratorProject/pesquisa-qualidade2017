import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CoOrientador } from './co-orientador.model';
import { CoOrientadorPopupService } from './co-orientador-popup.service';
import { CoOrientadorService } from './co-orientador.service';

@Component({
    selector: 'jhi-co-orientador-delete-dialog',
    templateUrl: './co-orientador-delete-dialog.component.html'
})
export class CoOrientadorDeleteDialogComponent {

    coOrientador: CoOrientador;

    constructor(
        private coOrientadorService: CoOrientadorService,
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
    selector: 'jhi-co-orientador-delete-popup',
    template: ''
})
export class CoOrientadorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coOrientadorPopupService: CoOrientadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.coOrientadorPopupService
                .open(CoOrientadorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

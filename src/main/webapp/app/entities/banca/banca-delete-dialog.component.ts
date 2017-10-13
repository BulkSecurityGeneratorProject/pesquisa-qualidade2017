import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Banca } from './banca.model';
import { BancaPopupService } from './banca-popup.service';
import { BancaService } from './banca.service';

@Component({
    selector: 'jhi-banca-delete-dialog',
    templateUrl: './banca-delete-dialog.component.html'
})
export class BancaDeleteDialogComponent {

    banca: Banca;

    constructor(
        private bancaService: BancaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bancaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bancaListModification',
                content: 'Deleted an banca'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-banca-delete-popup',
    template: ''
})
export class BancaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bancaPopupService: BancaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bancaPopupService
                .open(BancaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

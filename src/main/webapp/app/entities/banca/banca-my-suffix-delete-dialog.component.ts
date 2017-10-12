import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BancaMySuffix } from './banca-my-suffix.model';
import { BancaMySuffixPopupService } from './banca-my-suffix-popup.service';
import { BancaMySuffixService } from './banca-my-suffix.service';

@Component({
    selector: 'jhi-banca-my-suffix-delete-dialog',
    templateUrl: './banca-my-suffix-delete-dialog.component.html'
})
export class BancaMySuffixDeleteDialogComponent {

    banca: BancaMySuffix;

    constructor(
        private bancaService: BancaMySuffixService,
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
    selector: 'jhi-banca-my-suffix-delete-popup',
    template: ''
})
export class BancaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bancaPopupService: BancaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bancaPopupService
                .open(BancaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

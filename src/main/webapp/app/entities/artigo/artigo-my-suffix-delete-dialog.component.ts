import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ArtigoMySuffix } from './artigo-my-suffix.model';
import { ArtigoMySuffixPopupService } from './artigo-my-suffix-popup.service';
import { ArtigoMySuffixService } from './artigo-my-suffix.service';

@Component({
    selector: 'jhi-artigo-my-suffix-delete-dialog',
    templateUrl: './artigo-my-suffix-delete-dialog.component.html'
})
export class ArtigoMySuffixDeleteDialogComponent {

    artigo: ArtigoMySuffix;

    constructor(
        private artigoService: ArtigoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.artigoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'artigoListModification',
                content: 'Deleted an artigo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-artigo-my-suffix-delete-popup',
    template: ''
})
export class ArtigoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artigoPopupService: ArtigoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.artigoPopupService
                .open(ArtigoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

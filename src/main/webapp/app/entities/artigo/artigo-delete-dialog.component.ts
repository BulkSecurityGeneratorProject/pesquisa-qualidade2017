import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Artigo } from './artigo.model';
import { ArtigoPopupService } from './artigo-popup.service';
import { ArtigoService } from './artigo.service';

@Component({
    selector: 'jhi-artigo-delete-dialog',
    templateUrl: './artigo-delete-dialog.component.html'
})
export class ArtigoDeleteDialogComponent {

    artigo: Artigo;

    constructor(
        private artigoService: ArtigoService,
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
    selector: 'jhi-artigo-delete-popup',
    template: ''
})
export class ArtigoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artigoPopupService: ArtigoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.artigoPopupService
                .open(ArtigoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TeseMySuffix } from './tese-my-suffix.model';
import { TeseMySuffixPopupService } from './tese-my-suffix-popup.service';
import { TeseMySuffixService } from './tese-my-suffix.service';

@Component({
    selector: 'jhi-tese-my-suffix-delete-dialog',
    templateUrl: './tese-my-suffix-delete-dialog.component.html'
})
export class TeseMySuffixDeleteDialogComponent {

    tese: TeseMySuffix;

    constructor(
        private teseService: TeseMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'teseListModification',
                content: 'Deleted an tese'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tese-my-suffix-delete-popup',
    template: ''
})
export class TeseMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tesePopupService: TeseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tesePopupService
                .open(TeseMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tese } from './tese.model';
import { TesePopupService } from './tese-popup.service';
import { TeseService } from './tese.service';

@Component({
    selector: 'jhi-tese-delete-dialog',
    templateUrl: './tese-delete-dialog.component.html'
})
export class TeseDeleteDialogComponent {

    tese: Tese;

    constructor(
        private teseService: TeseService,
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
    selector: 'jhi-tese-delete-popup',
    template: ''
})
export class TeseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tesePopupService: TesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tesePopupService
                .open(TeseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

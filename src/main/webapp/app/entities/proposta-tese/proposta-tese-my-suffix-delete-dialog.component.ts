import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PropostaTeseMySuffix } from './proposta-tese-my-suffix.model';
import { PropostaTeseMySuffixPopupService } from './proposta-tese-my-suffix-popup.service';
import { PropostaTeseMySuffixService } from './proposta-tese-my-suffix.service';

@Component({
    selector: 'jhi-proposta-tese-my-suffix-delete-dialog',
    templateUrl: './proposta-tese-my-suffix-delete-dialog.component.html'
})
export class PropostaTeseMySuffixDeleteDialogComponent {

    propostaTese: PropostaTeseMySuffix;

    constructor(
        private propostaTeseService: PropostaTeseMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.propostaTeseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'propostaTeseListModification',
                content: 'Deleted an propostaTese'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-proposta-tese-my-suffix-delete-popup',
    template: ''
})
export class PropostaTeseMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private propostaTesePopupService: PropostaTeseMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.propostaTesePopupService
                .open(PropostaTeseMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

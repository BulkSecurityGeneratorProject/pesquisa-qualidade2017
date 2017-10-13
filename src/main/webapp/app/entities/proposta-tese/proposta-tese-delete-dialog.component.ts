import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PropostaTese } from './proposta-tese.model';
import { PropostaTesePopupService } from './proposta-tese-popup.service';
import { PropostaTeseService } from './proposta-tese.service';

@Component({
    selector: 'jhi-proposta-tese-delete-dialog',
    templateUrl: './proposta-tese-delete-dialog.component.html'
})
export class PropostaTeseDeleteDialogComponent {

    propostaTese: PropostaTese;

    constructor(
        private propostaTeseService: PropostaTeseService,
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
    selector: 'jhi-proposta-tese-delete-popup',
    template: ''
})
export class PropostaTeseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private propostaTesePopupService: PropostaTesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.propostaTesePopupService
                .open(PropostaTeseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApresentacaoMySuffix } from './apresentacao-my-suffix.model';
import { ApresentacaoMySuffixPopupService } from './apresentacao-my-suffix-popup.service';
import { ApresentacaoMySuffixService } from './apresentacao-my-suffix.service';

@Component({
    selector: 'jhi-apresentacao-my-suffix-delete-dialog',
    templateUrl: './apresentacao-my-suffix-delete-dialog.component.html'
})
export class ApresentacaoMySuffixDeleteDialogComponent {

    apresentacao: ApresentacaoMySuffix;

    constructor(
        private apresentacaoService: ApresentacaoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.apresentacaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'apresentacaoListModification',
                content: 'Deleted an apresentacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-apresentacao-my-suffix-delete-popup',
    template: ''
})
export class ApresentacaoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apresentacaoPopupService: ApresentacaoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.apresentacaoPopupService
                .open(ApresentacaoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

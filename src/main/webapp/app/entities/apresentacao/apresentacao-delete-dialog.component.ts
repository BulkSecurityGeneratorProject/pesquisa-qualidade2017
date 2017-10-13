import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Apresentacao } from './apresentacao.model';
import { ApresentacaoPopupService } from './apresentacao-popup.service';
import { ApresentacaoService } from './apresentacao.service';

@Component({
    selector: 'jhi-apresentacao-delete-dialog',
    templateUrl: './apresentacao-delete-dialog.component.html'
})
export class ApresentacaoDeleteDialogComponent {

    apresentacao: Apresentacao;

    constructor(
        private apresentacaoService: ApresentacaoService,
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
    selector: 'jhi-apresentacao-delete-popup',
    template: ''
})
export class ApresentacaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apresentacaoPopupService: ApresentacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.apresentacaoPopupService
                .open(ApresentacaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

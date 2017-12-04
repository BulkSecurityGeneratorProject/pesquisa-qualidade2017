import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Apresentacao } from './apresentacao.model';
import { ApresentacaoPopupService } from './apresentacao-popup.service';
import { ApresentacaoService } from './apresentacao.service';

@Component({
    selector: 'jhi-apresentacao-status-dialog',
    templateUrl: './apresentacao-status-dialog.component.html'
})
export class ApresentacaoStatusDialogComponent {

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

    confirmStatus(id: number) {
        this.apresentacaoService.update(this.apresentacao).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'apresentacaoListModification',
                    content: 'Atualizou o status de uma apresentacao'
                });
                this.activeModal.dismiss(true);
            });
        }
    }

@Component({
    selector: 'jhi-apresentacao-status-popup',
    template: ''
})
export class ApresentacaoAceitarPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apresentacaoPopupService: ApresentacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.apresentacaoPopupService
            .open(ApresentacaoStatusDialogComponent as Component,
                params['id'],
                undefined,
                undefined,
                true);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

@Component({
    selector: 'jhi-apresentacao-status-popup',
    template: ''
})
export class ApresentacaoRecusarPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private apresentacaoPopupService: ApresentacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.apresentacaoPopupService
                .open(ApresentacaoStatusDialogComponent as Component,
                    params['id'],
                    undefined,
                    undefined,
                    false);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}


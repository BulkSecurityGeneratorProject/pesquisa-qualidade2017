import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AreaPesquisaMySuffix } from './area-pesquisa-my-suffix.model';
import { AreaPesquisaMySuffixPopupService } from './area-pesquisa-my-suffix-popup.service';
import { AreaPesquisaMySuffixService } from './area-pesquisa-my-suffix.service';

@Component({
    selector: 'jhi-area-pesquisa-my-suffix-delete-dialog',
    templateUrl: './area-pesquisa-my-suffix-delete-dialog.component.html'
})
export class AreaPesquisaMySuffixDeleteDialogComponent {

    areaPesquisa: AreaPesquisaMySuffix;

    constructor(
        private areaPesquisaService: AreaPesquisaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.areaPesquisaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'areaPesquisaListModification',
                content: 'Deleted an areaPesquisa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-area-pesquisa-my-suffix-delete-popup',
    template: ''
})
export class AreaPesquisaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPesquisaPopupService: AreaPesquisaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.areaPesquisaPopupService
                .open(AreaPesquisaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

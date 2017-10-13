import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AreaPesquisa } from './area-pesquisa.model';
import { AreaPesquisaPopupService } from './area-pesquisa-popup.service';
import { AreaPesquisaService } from './area-pesquisa.service';

@Component({
    selector: 'jhi-area-pesquisa-delete-dialog',
    templateUrl: './area-pesquisa-delete-dialog.component.html'
})
export class AreaPesquisaDeleteDialogComponent {

    areaPesquisa: AreaPesquisa;

    constructor(
        private areaPesquisaService: AreaPesquisaService,
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
    selector: 'jhi-area-pesquisa-delete-popup',
    template: ''
})
export class AreaPesquisaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPesquisaPopupService: AreaPesquisaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.areaPesquisaPopupService
                .open(AreaPesquisaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

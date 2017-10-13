import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessorBanca } from './professor-banca.model';
import { ProfessorBancaPopupService } from './professor-banca-popup.service';
import { ProfessorBancaService } from './professor-banca.service';

@Component({
    selector: 'jhi-professor-banca-delete-dialog',
    templateUrl: './professor-banca-delete-dialog.component.html'
})
export class ProfessorBancaDeleteDialogComponent {

    professorBanca: ProfessorBanca;

    constructor(
        private professorBancaService: ProfessorBancaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.professorBancaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'professorBancaListModification',
                content: 'Deleted an professorBanca'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-professor-banca-delete-popup',
    template: ''
})
export class ProfessorBancaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorBancaPopupService: ProfessorBancaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.professorBancaPopupService
                .open(ProfessorBancaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

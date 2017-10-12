import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessorBancaMySuffix } from './professor-banca-my-suffix.model';
import { ProfessorBancaMySuffixPopupService } from './professor-banca-my-suffix-popup.service';
import { ProfessorBancaMySuffixService } from './professor-banca-my-suffix.service';

@Component({
    selector: 'jhi-professor-banca-my-suffix-delete-dialog',
    templateUrl: './professor-banca-my-suffix-delete-dialog.component.html'
})
export class ProfessorBancaMySuffixDeleteDialogComponent {

    professorBanca: ProfessorBancaMySuffix;

    constructor(
        private professorBancaService: ProfessorBancaMySuffixService,
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
    selector: 'jhi-professor-banca-my-suffix-delete-popup',
    template: ''
})
export class ProfessorBancaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorBancaPopupService: ProfessorBancaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.professorBancaPopupService
                .open(ProfessorBancaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessorMySuffix } from './professor-my-suffix.model';
import { ProfessorMySuffixPopupService } from './professor-my-suffix-popup.service';
import { ProfessorMySuffixService } from './professor-my-suffix.service';

@Component({
    selector: 'jhi-professor-my-suffix-delete-dialog',
    templateUrl: './professor-my-suffix-delete-dialog.component.html'
})
export class ProfessorMySuffixDeleteDialogComponent {

    professor: ProfessorMySuffix;

    constructor(
        private professorService: ProfessorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.professorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'professorListModification',
                content: 'Deleted an professor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-professor-my-suffix-delete-popup',
    template: ''
})
export class ProfessorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorPopupService: ProfessorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.professorPopupService
                .open(ProfessorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

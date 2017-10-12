import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlunoMySuffix } from './aluno-my-suffix.model';
import { AlunoMySuffixPopupService } from './aluno-my-suffix-popup.service';
import { AlunoMySuffixService } from './aluno-my-suffix.service';

@Component({
    selector: 'jhi-aluno-my-suffix-delete-dialog',
    templateUrl: './aluno-my-suffix-delete-dialog.component.html'
})
export class AlunoMySuffixDeleteDialogComponent {

    aluno: AlunoMySuffix;

    constructor(
        private alunoService: AlunoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alunoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alunoListModification',
                content: 'Deleted an aluno'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-aluno-my-suffix-delete-popup',
    template: ''
})
export class AlunoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alunoPopupService: AlunoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alunoPopupService
                .open(AlunoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

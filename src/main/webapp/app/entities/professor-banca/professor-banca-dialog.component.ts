import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProfessorBanca } from './professor-banca.model';
import { ProfessorBancaPopupService } from './professor-banca-popup.service';
import { ProfessorBancaService } from './professor-banca.service';
import { Professor, ProfessorService } from '../professor';
import { Banca, BancaService } from '../banca';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-professor-banca-dialog',
    templateUrl: './professor-banca-dialog.component.html'
})
export class ProfessorBancaDialogComponent implements OnInit {

    professorBanca: ProfessorBanca;
    isSaving: boolean;

    professors: Professor[];
    listaConvidados: Professor[];

    bancas: Banca[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private professorBancaService: ProfessorBancaService,
        private professorService: ProfessorService,
        private bancaService: BancaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.professorService.findNotInvited(this.professorBanca.bancaId)
            .subscribe((res: ResponseWrapper) => { 
                this.professors = res.json;             
            }, (res: ResponseWrapper) => this.onError(res.json));        
        
            this.bancaService.query()
            .subscribe((res: ResponseWrapper) => { this.bancas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

            if(this.professorBanca.id == null) {
                this.professorBanca.invite = true;
            }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.professorBanca.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professorBancaService.update(this.professorBanca));
        } else {
            this.subscribeToSaveResponse(
                this.professorBancaService.create(this.professorBanca));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProfessorBanca>) {
        result.subscribe((res: ProfessorBanca) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProfessorBanca) {
        this.eventManager.broadcast({ name: 'professorBancaListModification', content: 'OK'});
        this.eventManager.broadcast({ name: 'bancaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProfessorById(index: number, item: Professor) {
        return item.id;
    }

    trackBancaById(index: number, item: Banca) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-professor-banca-popup',
    template: ''
})
export class ProfessorBancaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorBancaPopupService: ProfessorBancaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professorBancaPopupService
                    .open(ProfessorBancaDialogComponent as Component, params['id']);
            } else if ( params['idBanca'] ) {
                this.professorBancaPopupService
                    .open(ProfessorBancaDialogComponent as Component, undefined, params['idBanca'] );
            }  else {
                this.professorBancaPopupService
                    .open(ProfessorBancaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

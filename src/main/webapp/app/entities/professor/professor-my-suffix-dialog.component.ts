import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProfessorMySuffix } from './professor-my-suffix.model';
import { ProfessorMySuffixPopupService } from './professor-my-suffix-popup.service';
import { ProfessorMySuffixService } from './professor-my-suffix.service';
import { ProfessorBancaMySuffix, ProfessorBancaMySuffixService } from '../professor-banca';
import { AlunoMySuffix, AlunoMySuffixService } from '../aluno';
import { AreaPesquisaMySuffix, AreaPesquisaMySuffixService } from '../area-pesquisa';
import { CoOrientadorMySuffix, CoOrientadorMySuffixService } from '../co-orientador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-professor-my-suffix-dialog',
    templateUrl: './professor-my-suffix-dialog.component.html'
})
export class ProfessorMySuffixDialogComponent implements OnInit {

    professor: ProfessorMySuffix;
    isSaving: boolean;

    professorbancas: ProfessorBancaMySuffix[];

    alunos: AlunoMySuffix[];

    areas: AreaPesquisaMySuffix[];

    coorientadors: CoOrientadorMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private professorService: ProfessorMySuffixService,
        private professorBancaService: ProfessorBancaMySuffixService,
        private alunoService: AlunoMySuffixService,
        private areaPesquisaService: AreaPesquisaMySuffixService,
        private coOrientadorService: CoOrientadorMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.professorBancaService.query()
            .subscribe((res: ResponseWrapper) => { this.professorbancas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.alunoService.query()
            .subscribe((res: ResponseWrapper) => { this.alunos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.areaPesquisaService
            .query({filter: 'professor-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.professor.areaId) {
                    this.areas = res.json;
                } else {
                    this.areaPesquisaService
                        .find(this.professor.areaId)
                        .subscribe((subRes: AreaPesquisaMySuffix) => {
                            this.areas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.coOrientadorService.query()
            .subscribe((res: ResponseWrapper) => { this.coorientadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.professor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professorService.update(this.professor));
        } else {
            this.subscribeToSaveResponse(
                this.professorService.create(this.professor));
        }
    }

    private subscribeToSaveResponse(result: Observable<ProfessorMySuffix>) {
        result.subscribe((res: ProfessorMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ProfessorMySuffix) {
        this.eventManager.broadcast({ name: 'professorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProfessorBancaById(index: number, item: ProfessorBancaMySuffix) {
        return item.id;
    }

    trackAlunoById(index: number, item: AlunoMySuffix) {
        return item.id;
    }

    trackAreaPesquisaById(index: number, item: AreaPesquisaMySuffix) {
        return item.id;
    }

    trackCoOrientadorById(index: number, item: CoOrientadorMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-professor-my-suffix-popup',
    template: ''
})
export class ProfessorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professorPopupService: ProfessorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professorPopupService
                    .open(ProfessorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.professorPopupService
                    .open(ProfessorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

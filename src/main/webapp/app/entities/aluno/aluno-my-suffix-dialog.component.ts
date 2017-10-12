import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlunoMySuffix } from './aluno-my-suffix.model';
import { AlunoMySuffixPopupService } from './aluno-my-suffix-popup.service';
import { AlunoMySuffixService } from './aluno-my-suffix.service';
import { ArtigoMySuffix, ArtigoMySuffixService } from '../artigo';
import { PropostaTeseMySuffix, PropostaTeseMySuffixService } from '../proposta-tese';
import { CoOrientadorMySuffix, CoOrientadorMySuffixService } from '../co-orientador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-aluno-my-suffix-dialog',
    templateUrl: './aluno-my-suffix-dialog.component.html'
})
export class AlunoMySuffixDialogComponent implements OnInit {

    aluno: AlunoMySuffix;
    isSaving: boolean;

    artigos: ArtigoMySuffix[];

    propostatese: PropostaTeseMySuffix[];

    coorientadors: CoOrientadorMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private alunoService: AlunoMySuffixService,
        private artigoService: ArtigoMySuffixService,
        private propostaTeseService: PropostaTeseMySuffixService,
        private coOrientadorService: CoOrientadorMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.artigoService.query()
            .subscribe((res: ResponseWrapper) => { this.artigos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.propostaTeseService.query()
            .subscribe((res: ResponseWrapper) => { this.propostatese = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.coOrientadorService.query()
            .subscribe((res: ResponseWrapper) => { this.coorientadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.aluno.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alunoService.update(this.aluno));
        } else {
            this.subscribeToSaveResponse(
                this.alunoService.create(this.aluno));
        }
    }

    private subscribeToSaveResponse(result: Observable<AlunoMySuffix>) {
        result.subscribe((res: AlunoMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AlunoMySuffix) {
        this.eventManager.broadcast({ name: 'alunoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackArtigoById(index: number, item: ArtigoMySuffix) {
        return item.id;
    }

    trackPropostaTeseById(index: number, item: PropostaTeseMySuffix) {
        return item.id;
    }

    trackCoOrientadorById(index: number, item: CoOrientadorMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-aluno-my-suffix-popup',
    template: ''
})
export class AlunoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alunoPopupService: AlunoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alunoPopupService
                    .open(AlunoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.alunoPopupService
                    .open(AlunoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

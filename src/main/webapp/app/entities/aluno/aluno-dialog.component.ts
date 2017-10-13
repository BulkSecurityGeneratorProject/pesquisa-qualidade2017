import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Aluno } from './aluno.model';
import { AlunoPopupService } from './aluno-popup.service';
import { AlunoService } from './aluno.service';
import { Artigo, ArtigoService } from '../artigo';
import { PropostaTese, PropostaTeseService } from '../proposta-tese';
import { User, UserService } from '../../shared';
import { CoOrientador, CoOrientadorService } from '../co-orientador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-aluno-dialog',
    templateUrl: './aluno-dialog.component.html'
})
export class AlunoDialogComponent implements OnInit {

    aluno: Aluno;
    isSaving: boolean;

    artigos: Artigo[];

    propostatese: PropostaTese[];

    users: User[];

    coorientadors: CoOrientador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private alunoService: AlunoService,
        private artigoService: ArtigoService,
        private propostaTeseService: PropostaTeseService,
        private userService: UserService,
        private coOrientadorService: CoOrientadorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.artigoService.query()
            .subscribe((res: ResponseWrapper) => { this.artigos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.propostaTeseService.query()
            .subscribe((res: ResponseWrapper) => { this.propostatese = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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

    private subscribeToSaveResponse(result: Observable<Aluno>) {
        result.subscribe((res: Aluno) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Aluno) {
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

    trackArtigoById(index: number, item: Artigo) {
        return item.id;
    }

    trackPropostaTeseById(index: number, item: PropostaTese) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCoOrientadorById(index: number, item: CoOrientador) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-aluno-popup',
    template: ''
})
export class AlunoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alunoPopupService: AlunoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alunoPopupService
                    .open(AlunoDialogComponent as Component, params['id']);
            } else {
                this.alunoPopupService
                    .open(AlunoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

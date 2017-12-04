import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { ProfessorBanca } from './professor-banca.model';
import { ProfessorBancaService } from './professor-banca.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-professor-banca',
    templateUrl: './professor-banca.component.html'
})
export class ProfessorBancaComponent implements OnInit, OnDestroy {

    professorBancas: ProfessorBanca[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private professorBancaService: ProfessorBancaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.professorBancas = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.professorBancaService.findByUserId(this.currentAccount.id).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.professorBancas = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
        });
        this.registerChangeInProfessorBancas();
    }

    statusProfessorBanca(professorBanca: any, status: boolean){
        if (status){
            professorBanca.invite = false;
            this.professorBancaService.update(professorBanca).subscribe(()=>{}, ()=>{})
        } else {
            this.professorBancaService.delete(professorBanca).subscribe(()=>{}, ()=>{})
        }
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProfessorBanca) {
        return item.id;
    }
    registerChangeInProfessorBancas() {
        this.eventSubscriber = this.eventManager.subscribe('professorBancaListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.professorBancas.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

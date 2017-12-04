import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { PropostaTese } from './proposta-tese.model';
import { PropostaTeseService } from './proposta-tese.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-proposta-tese',
    templateUrl: './proposta-tese.component.html'
})
export class PropostaTeseComponent implements OnInit, OnDestroy {

    propostaTese: PropostaTese[];
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
        private propostaTeseService: PropostaTeseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.propostaTese = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.currentAccount = {};
    }

    loadAll() {
        
        if (this.currentAccount.authorities.indexOf("ROLE_PROFESSOR") > -1) {
            this.propostaTeseService.findProfessorByUserId(this.currentAccount.id).subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                (res: ResponseWrapper) => this.onError(res.json)
            );
        } else if (this.currentAccount.authorities.indexOf("ROLE_ALUNO") > -1){
            this.propostaTeseService.findAlunoByUserId(this.currentAccount.id).subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                (res: ResponseWrapper) => this.onError(res.json)
            );
        } else {
            this.propostaTeseService.query().subscribe(
                (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    aprovarProposta(proposta: any){
        proposta.flgaprovado = true;
        this.propostaTeseService.update(proposta).subscribe(()=>{}, ()=> {});
    }

    reset() {
        this.page = 0;
        this.propostaTese = [];
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
        this.registerChangeInPropostaTese();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PropostaTese) {
        return item.id;
    }
    registerChangeInPropostaTese() {
        this.eventSubscriber = this.eventManager.subscribe('propostaTeseListModification', (response) => this.reset());
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
            this.propostaTese.push(data[i]);
        }
        console.log(this.propostaTese);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

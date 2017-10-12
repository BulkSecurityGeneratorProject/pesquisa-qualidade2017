import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AreaPesquisaMySuffix } from './area-pesquisa-my-suffix.model';
import { AreaPesquisaMySuffixService } from './area-pesquisa-my-suffix.service';

@Component({
    selector: 'jhi-area-pesquisa-my-suffix-detail',
    templateUrl: './area-pesquisa-my-suffix-detail.component.html'
})
export class AreaPesquisaMySuffixDetailComponent implements OnInit, OnDestroy {

    areaPesquisa: AreaPesquisaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private areaPesquisaService: AreaPesquisaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAreaPesquisas();
    }

    load(id) {
        this.areaPesquisaService.find(id).subscribe((areaPesquisa) => {
            this.areaPesquisa = areaPesquisa;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAreaPesquisas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'areaPesquisaListModification',
            (response) => this.load(this.areaPesquisa.id)
        );
    }
}

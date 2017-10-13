import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AreaPesquisa } from './area-pesquisa.model';
import { AreaPesquisaService } from './area-pesquisa.service';

@Component({
    selector: 'jhi-area-pesquisa-detail',
    templateUrl: './area-pesquisa-detail.component.html'
})
export class AreaPesquisaDetailComponent implements OnInit, OnDestroy {

    areaPesquisa: AreaPesquisa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private areaPesquisaService: AreaPesquisaService,
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

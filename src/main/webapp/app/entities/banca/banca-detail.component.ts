import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Banca } from './banca.model';
import { BancaService } from './banca.service';

@Component({
    selector: 'jhi-banca-detail',
    templateUrl: './banca-detail.component.html'
})
export class BancaDetailComponent implements OnInit, OnDestroy {

    banca: Banca;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bancaService: BancaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBancas();
    }

    load(id) {
        this.bancaService.find(id).subscribe((banca) => {
            this.banca = banca;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBancas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bancaListModification',
            (response) => this.load(this.banca.id)
        );
    }
}

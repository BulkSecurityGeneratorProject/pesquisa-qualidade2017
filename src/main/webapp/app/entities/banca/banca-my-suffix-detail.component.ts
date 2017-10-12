import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BancaMySuffix } from './banca-my-suffix.model';
import { BancaMySuffixService } from './banca-my-suffix.service';

@Component({
    selector: 'jhi-banca-my-suffix-detail',
    templateUrl: './banca-my-suffix-detail.component.html'
})
export class BancaMySuffixDetailComponent implements OnInit, OnDestroy {

    banca: BancaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bancaService: BancaMySuffixService,
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

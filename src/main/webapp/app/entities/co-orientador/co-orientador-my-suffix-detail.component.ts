import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CoOrientadorMySuffix } from './co-orientador-my-suffix.model';
import { CoOrientadorMySuffixService } from './co-orientador-my-suffix.service';

@Component({
    selector: 'jhi-co-orientador-my-suffix-detail',
    templateUrl: './co-orientador-my-suffix-detail.component.html'
})
export class CoOrientadorMySuffixDetailComponent implements OnInit, OnDestroy {

    coOrientador: CoOrientadorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private coOrientadorService: CoOrientadorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCoOrientadors();
    }

    load(id) {
        this.coOrientadorService.find(id).subscribe((coOrientador) => {
            this.coOrientador = coOrientador;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCoOrientadors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'coOrientadorListModification',
            (response) => this.load(this.coOrientador.id)
        );
    }
}

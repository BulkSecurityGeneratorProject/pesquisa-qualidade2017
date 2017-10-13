import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CoOrientador } from './co-orientador.model';
import { CoOrientadorService } from './co-orientador.service';

@Component({
    selector: 'jhi-co-orientador-detail',
    templateUrl: './co-orientador-detail.component.html'
})
export class CoOrientadorDetailComponent implements OnInit, OnDestroy {

    coOrientador: CoOrientador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private coOrientadorService: CoOrientadorService,
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

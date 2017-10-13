import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Artigo } from './artigo.model';
import { ArtigoService } from './artigo.service';

@Component({
    selector: 'jhi-artigo-detail',
    templateUrl: './artigo-detail.component.html'
})
export class ArtigoDetailComponent implements OnInit, OnDestroy {

    artigo: Artigo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private artigoService: ArtigoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArtigos();
    }

    load(id) {
        this.artigoService.find(id).subscribe((artigo) => {
            this.artigo = artigo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArtigos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'artigoListModification',
            (response) => this.load(this.artigo.id)
        );
    }
}

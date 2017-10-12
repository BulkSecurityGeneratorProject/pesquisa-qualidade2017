import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ArtigoMySuffix } from './artigo-my-suffix.model';
import { ArtigoMySuffixService } from './artigo-my-suffix.service';

@Component({
    selector: 'jhi-artigo-my-suffix-detail',
    templateUrl: './artigo-my-suffix-detail.component.html'
})
export class ArtigoMySuffixDetailComponent implements OnInit, OnDestroy {

    artigo: ArtigoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private artigoService: ArtigoMySuffixService,
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

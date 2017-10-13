import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Apresentacao } from './apresentacao.model';
import { ApresentacaoService } from './apresentacao.service';

@Component({
    selector: 'jhi-apresentacao-detail',
    templateUrl: './apresentacao-detail.component.html'
})
export class ApresentacaoDetailComponent implements OnInit, OnDestroy {

    apresentacao: Apresentacao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private apresentacaoService: ApresentacaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInApresentacaos();
    }

    load(id) {
        this.apresentacaoService.find(id).subscribe((apresentacao) => {
            this.apresentacao = apresentacao;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInApresentacaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'apresentacaoListModification',
            (response) => this.load(this.apresentacao.id)
        );
    }
}

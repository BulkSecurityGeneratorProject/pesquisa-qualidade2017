import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PropostaTese } from './proposta-tese.model';
import { PropostaTeseService } from './proposta-tese.service';

@Component({
    selector: 'jhi-proposta-tese-detail',
    templateUrl: './proposta-tese-detail.component.html'
})
export class PropostaTeseDetailComponent implements OnInit, OnDestroy {

    propostaTese: PropostaTese;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private propostaTeseService: PropostaTeseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPropostaTese();
    }

    load(id) {
        this.propostaTeseService.find(id).subscribe((propostaTese) => {
            this.propostaTese = propostaTese;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPropostaTese() {
        this.eventSubscriber = this.eventManager.subscribe(
            'propostaTeseListModification',
            (response) => this.load(this.propostaTese.id)
        );
    }
}

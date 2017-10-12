import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PropostaTeseMySuffix } from './proposta-tese-my-suffix.model';
import { PropostaTeseMySuffixService } from './proposta-tese-my-suffix.service';

@Component({
    selector: 'jhi-proposta-tese-my-suffix-detail',
    templateUrl: './proposta-tese-my-suffix-detail.component.html'
})
export class PropostaTeseMySuffixDetailComponent implements OnInit, OnDestroy {

    propostaTese: PropostaTeseMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private propostaTeseService: PropostaTeseMySuffixService,
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

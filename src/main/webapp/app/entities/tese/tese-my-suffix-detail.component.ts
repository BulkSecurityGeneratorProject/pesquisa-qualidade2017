import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TeseMySuffix } from './tese-my-suffix.model';
import { TeseMySuffixService } from './tese-my-suffix.service';

@Component({
    selector: 'jhi-tese-my-suffix-detail',
    templateUrl: './tese-my-suffix-detail.component.html'
})
export class TeseMySuffixDetailComponent implements OnInit, OnDestroy {

    tese: TeseMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teseService: TeseMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTese();
    }

    load(id) {
        this.teseService.find(id).subscribe((tese) => {
            this.tese = tese;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTese() {
        this.eventSubscriber = this.eventManager.subscribe(
            'teseListModification',
            (response) => this.load(this.tese.id)
        );
    }
}

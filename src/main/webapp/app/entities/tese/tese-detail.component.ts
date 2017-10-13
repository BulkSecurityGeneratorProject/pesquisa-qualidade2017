import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tese } from './tese.model';
import { TeseService } from './tese.service';

@Component({
    selector: 'jhi-tese-detail',
    templateUrl: './tese-detail.component.html'
})
export class TeseDetailComponent implements OnInit, OnDestroy {

    tese: Tese;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private teseService: TeseService,
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

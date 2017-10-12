import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessorBancaMySuffix } from './professor-banca-my-suffix.model';
import { ProfessorBancaMySuffixService } from './professor-banca-my-suffix.service';

@Component({
    selector: 'jhi-professor-banca-my-suffix-detail',
    templateUrl: './professor-banca-my-suffix-detail.component.html'
})
export class ProfessorBancaMySuffixDetailComponent implements OnInit, OnDestroy {

    professorBanca: ProfessorBancaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private professorBancaService: ProfessorBancaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProfessorBancas();
    }

    load(id) {
        this.professorBancaService.find(id).subscribe((professorBanca) => {
            this.professorBanca = professorBanca;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProfessorBancas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'professorBancaListModification',
            (response) => this.load(this.professorBanca.id)
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessorBanca } from './professor-banca.model';
import { ProfessorBancaService } from './professor-banca.service';

@Component({
    selector: 'jhi-professor-banca-detail',
    templateUrl: './professor-banca-detail.component.html'
})
export class ProfessorBancaDetailComponent implements OnInit, OnDestroy {

    professorBanca: ProfessorBanca;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private professorBancaService: ProfessorBancaService,
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

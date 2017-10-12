import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessorMySuffix } from './professor-my-suffix.model';
import { ProfessorMySuffixService } from './professor-my-suffix.service';

@Component({
    selector: 'jhi-professor-my-suffix-detail',
    templateUrl: './professor-my-suffix-detail.component.html'
})
export class ProfessorMySuffixDetailComponent implements OnInit, OnDestroy {

    professor: ProfessorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private professorService: ProfessorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProfessors();
    }

    load(id) {
        this.professorService.find(id).subscribe((professor) => {
            this.professor = professor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProfessors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'professorListModification',
            (response) => this.load(this.professor.id)
        );
    }
}

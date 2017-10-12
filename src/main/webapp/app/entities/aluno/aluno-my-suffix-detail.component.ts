import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AlunoMySuffix } from './aluno-my-suffix.model';
import { AlunoMySuffixService } from './aluno-my-suffix.service';

@Component({
    selector: 'jhi-aluno-my-suffix-detail',
    templateUrl: './aluno-my-suffix-detail.component.html'
})
export class AlunoMySuffixDetailComponent implements OnInit, OnDestroy {

    aluno: AlunoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alunoService: AlunoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlunos();
    }

    load(id) {
        this.alunoService.find(id).subscribe((aluno) => {
            this.aluno = aluno;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlunos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'alunoListModification',
            (response) => this.load(this.aluno.id)
        );
    }
}

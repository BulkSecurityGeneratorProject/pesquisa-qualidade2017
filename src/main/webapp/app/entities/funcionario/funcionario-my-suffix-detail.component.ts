import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FuncionarioMySuffix } from './funcionario-my-suffix.model';
import { FuncionarioMySuffixService } from './funcionario-my-suffix.service';

@Component({
    selector: 'jhi-funcionario-my-suffix-detail',
    templateUrl: './funcionario-my-suffix-detail.component.html'
})
export class FuncionarioMySuffixDetailComponent implements OnInit, OnDestroy {

    funcionario: FuncionarioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private funcionarioService: FuncionarioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFuncionarios();
    }

    load(id) {
        this.funcionarioService.find(id).subscribe((funcionario) => {
            this.funcionario = funcionario;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFuncionarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'funcionarioListModification',
            (response) => this.load(this.funcionario.id)
        );
    }
}

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ApresentacaoDetailComponent } from '../../../../../../main/webapp/app/entities/apresentacao/apresentacao-detail.component';
import { ApresentacaoService } from '../../../../../../main/webapp/app/entities/apresentacao/apresentacao.service';
import { Apresentacao } from '../../../../../../main/webapp/app/entities/apresentacao/apresentacao.model';

describe('Component Tests', () => {

    describe('Apresentacao Management Detail Component', () => {
        let comp: ApresentacaoDetailComponent;
        let fixture: ComponentFixture<ApresentacaoDetailComponent>;
        let service: ApresentacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ApresentacaoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ApresentacaoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ApresentacaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApresentacaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApresentacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Apresentacao(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.apresentacao).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

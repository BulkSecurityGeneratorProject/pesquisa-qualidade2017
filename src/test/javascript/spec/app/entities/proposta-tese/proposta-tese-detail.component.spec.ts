/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PropostaTeseDetailComponent } from '../../../../../../main/webapp/app/entities/proposta-tese/proposta-tese-detail.component';
import { PropostaTeseService } from '../../../../../../main/webapp/app/entities/proposta-tese/proposta-tese.service';
import { PropostaTese } from '../../../../../../main/webapp/app/entities/proposta-tese/proposta-tese.model';

describe('Component Tests', () => {

    describe('PropostaTese Management Detail Component', () => {
        let comp: PropostaTeseDetailComponent;
        let fixture: ComponentFixture<PropostaTeseDetailComponent>;
        let service: PropostaTeseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PropostaTeseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PropostaTeseService,
                    JhiEventManager
                ]
            }).overrideTemplate(PropostaTeseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PropostaTeseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropostaTeseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PropostaTese(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.propostaTese).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

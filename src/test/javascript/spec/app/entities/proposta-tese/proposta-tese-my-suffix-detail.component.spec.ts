/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PropostaTeseMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/proposta-tese/proposta-tese-my-suffix-detail.component';
import { PropostaTeseMySuffixService } from '../../../../../../main/webapp/app/entities/proposta-tese/proposta-tese-my-suffix.service';
import { PropostaTeseMySuffix } from '../../../../../../main/webapp/app/entities/proposta-tese/proposta-tese-my-suffix.model';

describe('Component Tests', () => {

    describe('PropostaTeseMySuffix Management Detail Component', () => {
        let comp: PropostaTeseMySuffixDetailComponent;
        let fixture: ComponentFixture<PropostaTeseMySuffixDetailComponent>;
        let service: PropostaTeseMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PropostaTeseMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PropostaTeseMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PropostaTeseMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PropostaTeseMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropostaTeseMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PropostaTeseMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.propostaTese).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

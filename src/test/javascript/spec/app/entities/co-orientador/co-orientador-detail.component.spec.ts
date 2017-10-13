/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CoOrientadorDetailComponent } from '../../../../../../main/webapp/app/entities/co-orientador/co-orientador-detail.component';
import { CoOrientadorService } from '../../../../../../main/webapp/app/entities/co-orientador/co-orientador.service';
import { CoOrientador } from '../../../../../../main/webapp/app/entities/co-orientador/co-orientador.model';

describe('Component Tests', () => {

    describe('CoOrientador Management Detail Component', () => {
        let comp: CoOrientadorDetailComponent;
        let fixture: ComponentFixture<CoOrientadorDetailComponent>;
        let service: CoOrientadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CoOrientadorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CoOrientadorService,
                    JhiEventManager
                ]
            }).overrideTemplate(CoOrientadorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CoOrientadorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoOrientadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CoOrientador(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.coOrientador).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

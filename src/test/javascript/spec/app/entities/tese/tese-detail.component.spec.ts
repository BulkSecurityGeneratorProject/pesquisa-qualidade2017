/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TeseDetailComponent } from '../../../../../../main/webapp/app/entities/tese/tese-detail.component';
import { TeseService } from '../../../../../../main/webapp/app/entities/tese/tese.service';
import { Tese } from '../../../../../../main/webapp/app/entities/tese/tese.model';

describe('Component Tests', () => {

    describe('Tese Management Detail Component', () => {
        let comp: TeseDetailComponent;
        let fixture: ComponentFixture<TeseDetailComponent>;
        let service: TeseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TeseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TeseService,
                    JhiEventManager
                ]
            }).overrideTemplate(TeseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tese(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tese).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

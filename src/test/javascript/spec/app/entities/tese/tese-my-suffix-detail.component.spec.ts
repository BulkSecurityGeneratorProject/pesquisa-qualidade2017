/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TeseMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tese/tese-my-suffix-detail.component';
import { TeseMySuffixService } from '../../../../../../main/webapp/app/entities/tese/tese-my-suffix.service';
import { TeseMySuffix } from '../../../../../../main/webapp/app/entities/tese/tese-my-suffix.model';

describe('Component Tests', () => {

    describe('TeseMySuffix Management Detail Component', () => {
        let comp: TeseMySuffixDetailComponent;
        let fixture: ComponentFixture<TeseMySuffixDetailComponent>;
        let service: TeseMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TeseMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TeseMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(TeseMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeseMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeseMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TeseMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tese).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

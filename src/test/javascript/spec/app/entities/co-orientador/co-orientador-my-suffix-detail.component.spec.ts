/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CoOrientadorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/co-orientador/co-orientador-my-suffix-detail.component';
import { CoOrientadorMySuffixService } from '../../../../../../main/webapp/app/entities/co-orientador/co-orientador-my-suffix.service';
import { CoOrientadorMySuffix } from '../../../../../../main/webapp/app/entities/co-orientador/co-orientador-my-suffix.model';

describe('Component Tests', () => {

    describe('CoOrientadorMySuffix Management Detail Component', () => {
        let comp: CoOrientadorMySuffixDetailComponent;
        let fixture: ComponentFixture<CoOrientadorMySuffixDetailComponent>;
        let service: CoOrientadorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CoOrientadorMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CoOrientadorMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(CoOrientadorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CoOrientadorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CoOrientadorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CoOrientadorMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.coOrientador).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

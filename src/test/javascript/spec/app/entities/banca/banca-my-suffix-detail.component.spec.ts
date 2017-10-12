/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BancaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/banca/banca-my-suffix-detail.component';
import { BancaMySuffixService } from '../../../../../../main/webapp/app/entities/banca/banca-my-suffix.service';
import { BancaMySuffix } from '../../../../../../main/webapp/app/entities/banca/banca-my-suffix.model';

describe('Component Tests', () => {

    describe('BancaMySuffix Management Detail Component', () => {
        let comp: BancaMySuffixDetailComponent;
        let fixture: ComponentFixture<BancaMySuffixDetailComponent>;
        let service: BancaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [BancaMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BancaMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(BancaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BancaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BancaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BancaMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.banca).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

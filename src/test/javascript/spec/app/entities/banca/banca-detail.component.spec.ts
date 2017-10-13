/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BancaDetailComponent } from '../../../../../../main/webapp/app/entities/banca/banca-detail.component';
import { BancaService } from '../../../../../../main/webapp/app/entities/banca/banca.service';
import { Banca } from '../../../../../../main/webapp/app/entities/banca/banca.model';

describe('Component Tests', () => {

    describe('Banca Management Detail Component', () => {
        let comp: BancaDetailComponent;
        let fixture: ComponentFixture<BancaDetailComponent>;
        let service: BancaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [BancaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BancaService,
                    JhiEventManager
                ]
            }).overrideTemplate(BancaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BancaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BancaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Banca(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.banca).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

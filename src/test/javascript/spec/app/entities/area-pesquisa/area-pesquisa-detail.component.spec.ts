/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AreaPesquisaDetailComponent } from '../../../../../../main/webapp/app/entities/area-pesquisa/area-pesquisa-detail.component';
import { AreaPesquisaService } from '../../../../../../main/webapp/app/entities/area-pesquisa/area-pesquisa.service';
import { AreaPesquisa } from '../../../../../../main/webapp/app/entities/area-pesquisa/area-pesquisa.model';

describe('Component Tests', () => {

    describe('AreaPesquisa Management Detail Component', () => {
        let comp: AreaPesquisaDetailComponent;
        let fixture: ComponentFixture<AreaPesquisaDetailComponent>;
        let service: AreaPesquisaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AreaPesquisaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AreaPesquisaService,
                    JhiEventManager
                ]
            }).overrideTemplate(AreaPesquisaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AreaPesquisaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AreaPesquisaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AreaPesquisa(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.areaPesquisa).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

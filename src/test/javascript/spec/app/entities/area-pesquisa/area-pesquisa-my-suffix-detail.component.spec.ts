/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AreaPesquisaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/area-pesquisa/area-pesquisa-my-suffix-detail.component';
import { AreaPesquisaMySuffixService } from '../../../../../../main/webapp/app/entities/area-pesquisa/area-pesquisa-my-suffix.service';
import { AreaPesquisaMySuffix } from '../../../../../../main/webapp/app/entities/area-pesquisa/area-pesquisa-my-suffix.model';

describe('Component Tests', () => {

    describe('AreaPesquisaMySuffix Management Detail Component', () => {
        let comp: AreaPesquisaMySuffixDetailComponent;
        let fixture: ComponentFixture<AreaPesquisaMySuffixDetailComponent>;
        let service: AreaPesquisaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AreaPesquisaMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AreaPesquisaMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AreaPesquisaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AreaPesquisaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AreaPesquisaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AreaPesquisaMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.areaPesquisa).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

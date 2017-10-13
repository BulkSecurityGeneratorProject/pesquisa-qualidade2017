/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ArtigoDetailComponent } from '../../../../../../main/webapp/app/entities/artigo/artigo-detail.component';
import { ArtigoService } from '../../../../../../main/webapp/app/entities/artigo/artigo.service';
import { Artigo } from '../../../../../../main/webapp/app/entities/artigo/artigo.model';

describe('Component Tests', () => {

    describe('Artigo Management Detail Component', () => {
        let comp: ArtigoDetailComponent;
        let fixture: ComponentFixture<ArtigoDetailComponent>;
        let service: ArtigoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ArtigoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ArtigoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ArtigoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArtigoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArtigoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Artigo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.artigo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ArtigoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/artigo/artigo-my-suffix-detail.component';
import { ArtigoMySuffixService } from '../../../../../../main/webapp/app/entities/artigo/artigo-my-suffix.service';
import { ArtigoMySuffix } from '../../../../../../main/webapp/app/entities/artigo/artigo-my-suffix.model';

describe('Component Tests', () => {

    describe('ArtigoMySuffix Management Detail Component', () => {
        let comp: ArtigoMySuffixDetailComponent;
        let fixture: ComponentFixture<ArtigoMySuffixDetailComponent>;
        let service: ArtigoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ArtigoMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ArtigoMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ArtigoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArtigoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArtigoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ArtigoMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.artigo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

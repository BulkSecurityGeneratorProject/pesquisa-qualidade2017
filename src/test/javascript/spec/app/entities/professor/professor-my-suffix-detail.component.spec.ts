/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProfessorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/professor/professor-my-suffix-detail.component';
import { ProfessorMySuffixService } from '../../../../../../main/webapp/app/entities/professor/professor-my-suffix.service';
import { ProfessorMySuffix } from '../../../../../../main/webapp/app/entities/professor/professor-my-suffix.model';

describe('Component Tests', () => {

    describe('ProfessorMySuffix Management Detail Component', () => {
        let comp: ProfessorMySuffixDetailComponent;
        let fixture: ComponentFixture<ProfessorMySuffixDetailComponent>;
        let service: ProfessorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ProfessorMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProfessorMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProfessorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProfessorMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.professor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

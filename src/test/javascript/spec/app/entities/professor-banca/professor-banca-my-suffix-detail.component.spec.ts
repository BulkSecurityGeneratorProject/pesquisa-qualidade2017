/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProfessorBancaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/professor-banca/professor-banca-my-suffix-detail.component';
import { ProfessorBancaMySuffixService } from '../../../../../../main/webapp/app/entities/professor-banca/professor-banca-my-suffix.service';
import { ProfessorBancaMySuffix } from '../../../../../../main/webapp/app/entities/professor-banca/professor-banca-my-suffix.model';

describe('Component Tests', () => {

    describe('ProfessorBancaMySuffix Management Detail Component', () => {
        let comp: ProfessorBancaMySuffixDetailComponent;
        let fixture: ComponentFixture<ProfessorBancaMySuffixDetailComponent>;
        let service: ProfessorBancaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ProfessorBancaMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProfessorBancaMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProfessorBancaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessorBancaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessorBancaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProfessorBancaMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.professorBanca).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

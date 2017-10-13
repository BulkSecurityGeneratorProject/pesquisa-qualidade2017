/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProfessorBancaDetailComponent } from '../../../../../../main/webapp/app/entities/professor-banca/professor-banca-detail.component';
import { ProfessorBancaService } from '../../../../../../main/webapp/app/entities/professor-banca/professor-banca.service';
import { ProfessorBanca } from '../../../../../../main/webapp/app/entities/professor-banca/professor-banca.model';

describe('Component Tests', () => {

    describe('ProfessorBanca Management Detail Component', () => {
        let comp: ProfessorBancaDetailComponent;
        let fixture: ComponentFixture<ProfessorBancaDetailComponent>;
        let service: ProfessorBancaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ProfessorBancaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProfessorBancaService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProfessorBancaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessorBancaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessorBancaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProfessorBanca(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.professorBanca).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

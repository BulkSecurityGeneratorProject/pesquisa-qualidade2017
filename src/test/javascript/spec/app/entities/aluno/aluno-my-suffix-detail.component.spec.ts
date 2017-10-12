/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AlunoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/aluno/aluno-my-suffix-detail.component';
import { AlunoMySuffixService } from '../../../../../../main/webapp/app/entities/aluno/aluno-my-suffix.service';
import { AlunoMySuffix } from '../../../../../../main/webapp/app/entities/aluno/aluno-my-suffix.model';

describe('Component Tests', () => {

    describe('AlunoMySuffix Management Detail Component', () => {
        let comp: AlunoMySuffixDetailComponent;
        let fixture: ComponentFixture<AlunoMySuffixDetailComponent>;
        let service: AlunoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AlunoMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AlunoMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(AlunoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlunoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlunoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AlunoMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.aluno).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

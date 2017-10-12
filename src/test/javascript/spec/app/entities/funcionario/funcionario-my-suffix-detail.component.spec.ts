/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FuncionarioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/funcionario/funcionario-my-suffix-detail.component';
import { FuncionarioMySuffixService } from '../../../../../../main/webapp/app/entities/funcionario/funcionario-my-suffix.service';
import { FuncionarioMySuffix } from '../../../../../../main/webapp/app/entities/funcionario/funcionario-my-suffix.model';

describe('Component Tests', () => {

    describe('FuncionarioMySuffix Management Detail Component', () => {
        let comp: FuncionarioMySuffixDetailComponent;
        let fixture: ComponentFixture<FuncionarioMySuffixDetailComponent>;
        let service: FuncionarioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [FuncionarioMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FuncionarioMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(FuncionarioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FuncionarioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FuncionarioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FuncionarioMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.funcionario).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

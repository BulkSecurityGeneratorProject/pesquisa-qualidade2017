/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ApresentacaoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/apresentacao/apresentacao-my-suffix-detail.component';
import { ApresentacaoMySuffixService } from '../../../../../../main/webapp/app/entities/apresentacao/apresentacao-my-suffix.service';
import { ApresentacaoMySuffix } from '../../../../../../main/webapp/app/entities/apresentacao/apresentacao-my-suffix.model';

describe('Component Tests', () => {

    describe('ApresentacaoMySuffix Management Detail Component', () => {
        let comp: ApresentacaoMySuffixDetailComponent;
        let fixture: ComponentFixture<ApresentacaoMySuffixDetailComponent>;
        let service: ApresentacaoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ApresentacaoMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ApresentacaoMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(ApresentacaoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApresentacaoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApresentacaoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ApresentacaoMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.apresentacao).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PropostaTese } from './proposta-tese.model';
import { PropostaTeseService } from './proposta-tese.service';

@Injectable()
export class PropostaTesePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private propostaTeseService: PropostaTeseService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, userId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.propostaTeseService.find(id).subscribe((propostaTese) => {
                    this.ngbModalRef = this.propostaTeseModalRef(component, propostaTese);
                    resolve(this.ngbModalRef);
                });
            } else if (userId) {
                let propostaTese  = new PropostaTese();
                propostaTese.userId = userId;
                
                setTimeout(() => {
                    this.ngbModalRef = this.propostaTeseModalRef(component, propostaTese);
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.propostaTeseModalRef(component, new PropostaTese());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    propostaTeseModalRef(component: Component, propostaTese: PropostaTese): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.propostaTese = propostaTese;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

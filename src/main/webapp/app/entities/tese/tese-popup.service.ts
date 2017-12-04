import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Tese } from './tese.model';
import { TeseService } from './tese.service';

@Injectable()
export class TesePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private teseService: TeseService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number  | any, userId?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.teseService.find(id).subscribe((tese) => {
                    this.ngbModalRef = this.teseModalRef(component, tese);
                    resolve(this.ngbModalRef);
                });
            } else if (userId) {
                let tese  = new Tese();
                tese.userId = userId;
                
                setTimeout(() => {
                    this.ngbModalRef = this.teseModalRef(component, tese);
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.teseModalRef(component, new Tese());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    teseModalRef(component: Component, tese: Tese): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tese = tese;
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

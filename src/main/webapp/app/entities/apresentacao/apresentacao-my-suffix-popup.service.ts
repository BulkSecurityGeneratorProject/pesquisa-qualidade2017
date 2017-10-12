import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApresentacaoMySuffix } from './apresentacao-my-suffix.model';
import { ApresentacaoMySuffixService } from './apresentacao-my-suffix.service';

@Injectable()
export class ApresentacaoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private apresentacaoService: ApresentacaoMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.apresentacaoService.find(id).subscribe((apresentacao) => {
                    if (apresentacao.data) {
                        apresentacao.data = {
                            year: apresentacao.data.getFullYear(),
                            month: apresentacao.data.getMonth() + 1,
                            day: apresentacao.data.getDate()
                        };
                    }
                    this.ngbModalRef = this.apresentacaoModalRef(component, apresentacao);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.apresentacaoModalRef(component, new ApresentacaoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    apresentacaoModalRef(component: Component, apresentacao: ApresentacaoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.apresentacao = apresentacao;
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

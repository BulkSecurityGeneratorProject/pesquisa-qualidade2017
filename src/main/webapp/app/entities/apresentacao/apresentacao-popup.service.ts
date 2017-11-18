import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Apresentacao } from './apresentacao.model';
import { ApresentacaoService } from './apresentacao.service';

@Injectable()
export class ApresentacaoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private apresentacaoService: ApresentacaoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, idTeseProposta?: number | any, isProposta?: boolean): Promise<NgbModalRef> {
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
                    setTimeout(() => {
                        this.ngbModalRef = this.apresentacaoModalRef(component, apresentacao);
                        resolve(this.ngbModalRef);
                    }, 0);
                });
            } else if (idTeseProposta) {
                let apresentacao = new Apresentacao();
                apresentacao.idTeseProposta = idTeseProposta;
                apresentacao.flgproposta = isProposta;

                setTimeout(() => {
                    this.ngbModalRef = this.apresentacaoModalRef(component, apresentacao);
                    resolve(this.ngbModalRef);
                }, 0);
                
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.apresentacaoModalRef(component, new Apresentacao());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    apresentacaoModalRef(component: Component, apresentacao: Apresentacao): NgbModalRef {
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

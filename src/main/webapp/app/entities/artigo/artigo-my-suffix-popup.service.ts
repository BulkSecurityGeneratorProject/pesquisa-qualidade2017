import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ArtigoMySuffix } from './artigo-my-suffix.model';
import { ArtigoMySuffixService } from './artigo-my-suffix.service';

@Injectable()
export class ArtigoMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private artigoService: ArtigoMySuffixService

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
                this.artigoService.find(id).subscribe((artigo) => {
                    if (artigo.datapublicacao) {
                        artigo.datapublicacao = {
                            year: artigo.datapublicacao.getFullYear(),
                            month: artigo.datapublicacao.getMonth() + 1,
                            day: artigo.datapublicacao.getDate()
                        };
                    }
                    this.ngbModalRef = this.artigoModalRef(component, artigo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.artigoModalRef(component, new ArtigoMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    artigoModalRef(component: Component, artigo: ArtigoMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.artigo = artigo;
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

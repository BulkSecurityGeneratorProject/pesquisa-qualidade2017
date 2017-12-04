import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Artigo } from './artigo.model';
import { ArtigoService } from './artigo.service';

@Injectable()
export class ArtigoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private artigoService: ArtigoService

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
            } else if (userId) {
                    let artigo = new Artigo();
                    artigo.userId = userId;
                    this.ngbModalRef = this.artigoModalRef(component, artigo);
                    resolve(this.ngbModalRef);
            }  else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.artigoModalRef(component, new Artigo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    artigoModalRef(component: Component, artigo: Artigo): NgbModalRef {
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

import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfessorBanca } from './professor-banca.model';
import { Professor } from '../professor/professor.model';
import { ProfessorBancaService } from './professor-banca.service';

@Injectable()
export class ProfessorBancaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private professorBancaService: ProfessorBancaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, idBanca?: number): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.professorBancaService.find(id).subscribe((professorBanca) => {
                    this.ngbModalRef = this.professorBancaModalRef(component, professorBanca);
                    resolve(this.ngbModalRef);
                });
            } else if (idBanca) {
                setTimeout(() => {
                    this.ngbModalRef = this.professorBancaModalRef(component, Object.assign(new ProfessorBanca(), {bancaId: idBanca}));
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.professorBancaModalRef(component, new ProfessorBanca());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    professorBancaModalRef(component: Component, professorBanca: ProfessorBanca, listaConvidados?: Professor[]): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.professorBanca = professorBanca;
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

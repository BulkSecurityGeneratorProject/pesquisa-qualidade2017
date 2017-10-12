import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ProfessorBancaMySuffix } from './professor-banca-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProfessorBancaMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/professor-bancas';

    constructor(private http: Http) { }

    create(professorBanca: ProfessorBancaMySuffix): Observable<ProfessorBancaMySuffix> {
        const copy = this.convert(professorBanca);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(professorBanca: ProfessorBancaMySuffix): Observable<ProfessorBancaMySuffix> {
        const copy = this.convert(professorBanca);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProfessorBancaMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to ProfessorBancaMySuffix.
     */
    private convertItemFromServer(json: any): ProfessorBancaMySuffix {
        const entity: ProfessorBancaMySuffix = Object.assign(new ProfessorBancaMySuffix(), json);
        return entity;
    }

    /**
     * Convert a ProfessorBancaMySuffix to a JSON which can be sent to the server.
     */
    private convert(professorBanca: ProfessorBancaMySuffix): ProfessorBancaMySuffix {
        const copy: ProfessorBancaMySuffix = Object.assign({}, professorBanca);
        return copy;
    }
}

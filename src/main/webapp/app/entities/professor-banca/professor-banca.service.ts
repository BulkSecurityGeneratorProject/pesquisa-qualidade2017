import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ProfessorBanca } from './professor-banca.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProfessorBancaService {

    private resourceUrl = SERVER_API_URL + 'api/professor-bancas';

    constructor(private http: Http) { }

    create(professorBanca: ProfessorBanca): Observable<ProfessorBanca> {
        const copy = this.convert(professorBanca);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(professorBanca: ProfessorBanca): Observable<ProfessorBanca> {
        const copy = this.convert(professorBanca);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProfessorBanca> {
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
     * Convert a returned JSON object to ProfessorBanca.
     */
    private convertItemFromServer(json: any): ProfessorBanca {
        const entity: ProfessorBanca = Object.assign(new ProfessorBanca(), json);
        return entity;
    }

    /**
     * Convert a ProfessorBanca to a JSON which can be sent to the server.
     */
    private convert(professorBanca: ProfessorBanca): ProfessorBanca {
        const copy: ProfessorBanca = Object.assign({}, professorBanca);
        return copy;
    }
}

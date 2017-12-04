import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PropostaTese } from './proposta-tese.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PropostaTeseService {

    private resourceUrl = SERVER_API_URL + 'api/proposta-tese';

    constructor(private http: Http) { }

    create(propostaTese: PropostaTese): Observable<PropostaTese> {
        const copy = this.convert(propostaTese);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(propostaTese: PropostaTese): Observable<PropostaTese> {
        const copy = this.convert(propostaTese);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PropostaTese> {
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

    findProfessorByUserId(userId: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/professor/${userId}`)
            .map((res: Response) => this.convertResponse(res));
    }

    findAlunoByUserId(userId: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/aluno/${userId}`)
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
     * Convert a returned JSON object to PropostaTese.
     */
    private convertItemFromServer(json: any): PropostaTese {
        const entity: PropostaTese = Object.assign(new PropostaTese(), json);
        return entity;
    }

    /**
     * Convert a PropostaTese to a JSON which can be sent to the server.
     */
    private convert(propostaTese: PropostaTese): PropostaTese {
        const copy: PropostaTese = Object.assign({}, propostaTese);
        return copy;
    }
}

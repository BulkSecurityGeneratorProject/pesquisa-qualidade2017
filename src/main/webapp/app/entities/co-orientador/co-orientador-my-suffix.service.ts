import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CoOrientadorMySuffix } from './co-orientador-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CoOrientadorMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/co-orientadors';

    constructor(private http: Http) { }

    create(coOrientador: CoOrientadorMySuffix): Observable<CoOrientadorMySuffix> {
        const copy = this.convert(coOrientador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(coOrientador: CoOrientadorMySuffix): Observable<CoOrientadorMySuffix> {
        const copy = this.convert(coOrientador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CoOrientadorMySuffix> {
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
     * Convert a returned JSON object to CoOrientadorMySuffix.
     */
    private convertItemFromServer(json: any): CoOrientadorMySuffix {
        const entity: CoOrientadorMySuffix = Object.assign(new CoOrientadorMySuffix(), json);
        return entity;
    }

    /**
     * Convert a CoOrientadorMySuffix to a JSON which can be sent to the server.
     */
    private convert(coOrientador: CoOrientadorMySuffix): CoOrientadorMySuffix {
        const copy: CoOrientadorMySuffix = Object.assign({}, coOrientador);
        return copy;
    }
}

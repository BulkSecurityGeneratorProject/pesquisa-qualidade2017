import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Tese } from './tese.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TeseService {

    private resourceUrl = SERVER_API_URL + 'api/tese';

    constructor(private http: Http) { }

    create(tese: Tese): Observable<Tese> {
        const copy = this.convert(tese);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tese: Tese): Observable<Tese> {
        const copy = this.convert(tese);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tese> {
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
     * Convert a returned JSON object to Tese.
     */
    private convertItemFromServer(json: any): Tese {
        const entity: Tese = Object.assign(new Tese(), json);
        return entity;
    }

    /**
     * Convert a Tese to a JSON which can be sent to the server.
     */
    private convert(tese: Tese): Tese {
        const copy: Tese = Object.assign({}, tese);
        return copy;
    }
}

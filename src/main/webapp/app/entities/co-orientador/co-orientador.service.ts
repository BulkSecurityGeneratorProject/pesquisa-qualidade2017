import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CoOrientador } from './co-orientador.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CoOrientadorService {

    private resourceUrl = SERVER_API_URL + 'api/co-orientadors';

    constructor(private http: Http) { }

    create(coOrientador: CoOrientador): Observable<CoOrientador> {
        const copy = this.convert(coOrientador);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(coOrientador: CoOrientador): Observable<CoOrientador> {
        const copy = this.convert(coOrientador);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CoOrientador> {
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
     * Convert a returned JSON object to CoOrientador.
     */
    private convertItemFromServer(json: any): CoOrientador {
        const entity: CoOrientador = Object.assign(new CoOrientador(), json);
        return entity;
    }

    /**
     * Convert a CoOrientador to a JSON which can be sent to the server.
     */
    private convert(coOrientador: CoOrientador): CoOrientador {
        const copy: CoOrientador = Object.assign({}, coOrientador);
        return copy;
    }
}

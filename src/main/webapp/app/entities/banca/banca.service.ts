import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Banca } from './banca.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BancaService {

    private resourceUrl = SERVER_API_URL + 'api/bancas';

    constructor(private http: Http) { }

    create(banca: Banca): Observable<Banca> {
        const copy = this.convert(banca);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(banca: Banca): Observable<Banca> {
        const copy = this.convert(banca);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Banca> {
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
     * Convert a returned JSON object to Banca.
     */
    private convertItemFromServer(json: any): Banca {
        const entity: Banca = Object.assign(new Banca(), json);
        return entity;
    }

    /**
     * Convert a Banca to a JSON which can be sent to the server.
     */
    private convert(banca: Banca): Banca {
        const copy: Banca = Object.assign({}, banca);
        return copy;
    }
}

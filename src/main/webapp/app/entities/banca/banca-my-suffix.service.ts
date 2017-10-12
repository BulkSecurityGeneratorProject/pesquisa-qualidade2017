import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BancaMySuffix } from './banca-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BancaMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/bancas';

    constructor(private http: Http) { }

    create(banca: BancaMySuffix): Observable<BancaMySuffix> {
        const copy = this.convert(banca);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(banca: BancaMySuffix): Observable<BancaMySuffix> {
        const copy = this.convert(banca);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BancaMySuffix> {
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
     * Convert a returned JSON object to BancaMySuffix.
     */
    private convertItemFromServer(json: any): BancaMySuffix {
        const entity: BancaMySuffix = Object.assign(new BancaMySuffix(), json);
        return entity;
    }

    /**
     * Convert a BancaMySuffix to a JSON which can be sent to the server.
     */
    private convert(banca: BancaMySuffix): BancaMySuffix {
        const copy: BancaMySuffix = Object.assign({}, banca);
        return copy;
    }
}

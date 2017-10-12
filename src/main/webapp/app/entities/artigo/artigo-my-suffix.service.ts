import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ArtigoMySuffix } from './artigo-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ArtigoMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/artigos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(artigo: ArtigoMySuffix): Observable<ArtigoMySuffix> {
        const copy = this.convert(artigo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(artigo: ArtigoMySuffix): Observable<ArtigoMySuffix> {
        const copy = this.convert(artigo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ArtigoMySuffix> {
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
     * Convert a returned JSON object to ArtigoMySuffix.
     */
    private convertItemFromServer(json: any): ArtigoMySuffix {
        const entity: ArtigoMySuffix = Object.assign(new ArtigoMySuffix(), json);
        entity.datapublicacao = this.dateUtils
            .convertLocalDateFromServer(json.datapublicacao);
        return entity;
    }

    /**
     * Convert a ArtigoMySuffix to a JSON which can be sent to the server.
     */
    private convert(artigo: ArtigoMySuffix): ArtigoMySuffix {
        const copy: ArtigoMySuffix = Object.assign({}, artigo);
        copy.datapublicacao = this.dateUtils
            .convertLocalDateToServer(artigo.datapublicacao);
        return copy;
    }
}

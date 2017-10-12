import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ApresentacaoMySuffix } from './apresentacao-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ApresentacaoMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/apresentacaos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(apresentacao: ApresentacaoMySuffix): Observable<ApresentacaoMySuffix> {
        const copy = this.convert(apresentacao);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(apresentacao: ApresentacaoMySuffix): Observable<ApresentacaoMySuffix> {
        const copy = this.convert(apresentacao);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ApresentacaoMySuffix> {
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
     * Convert a returned JSON object to ApresentacaoMySuffix.
     */
    private convertItemFromServer(json: any): ApresentacaoMySuffix {
        const entity: ApresentacaoMySuffix = Object.assign(new ApresentacaoMySuffix(), json);
        entity.data = this.dateUtils
            .convertLocalDateFromServer(json.data);
        return entity;
    }

    /**
     * Convert a ApresentacaoMySuffix to a JSON which can be sent to the server.
     */
    private convert(apresentacao: ApresentacaoMySuffix): ApresentacaoMySuffix {
        const copy: ApresentacaoMySuffix = Object.assign({}, apresentacao);
        copy.data = this.dateUtils
            .convertLocalDateToServer(apresentacao.data);
        return copy;
    }
}

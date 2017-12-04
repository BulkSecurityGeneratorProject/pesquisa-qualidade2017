import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Apresentacao } from './apresentacao.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ApresentacaoService {

    private resourceUrl = SERVER_API_URL + 'api/apresentacaos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(apresentacao: Apresentacao): Observable<Apresentacao> {
        const copy = this.convert(apresentacao);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(apresentacao: Apresentacao): Observable<Apresentacao> {
        const copy = this.convert(apresentacao);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Apresentacao> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(idUser: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceUrl}/user/${idUser}`, options)
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
     * Convert a returned JSON object to Apresentacao.
     */
    private convertItemFromServer(json: any): Apresentacao {
        const entity: Apresentacao = Object.assign(new Apresentacao(), json);
        entity.data = this.dateUtils
            .convertLocalDateFromServer(json.data);
        return entity;
    }

    /**
     * Convert a Apresentacao to a JSON which can be sent to the server.
     */
    private convert(apresentacao: Apresentacao): Apresentacao {
        const copy: Apresentacao = Object.assign({}, apresentacao);
        copy.data = this.dateUtils
            .convertLocalDateToServer(apresentacao.data);
        return copy;
    }
}

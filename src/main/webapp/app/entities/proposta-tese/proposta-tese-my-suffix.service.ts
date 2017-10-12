import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PropostaTeseMySuffix } from './proposta-tese-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PropostaTeseMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/proposta-tese';

    constructor(private http: Http) { }

    create(propostaTese: PropostaTeseMySuffix): Observable<PropostaTeseMySuffix> {
        const copy = this.convert(propostaTese);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(propostaTese: PropostaTeseMySuffix): Observable<PropostaTeseMySuffix> {
        const copy = this.convert(propostaTese);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PropostaTeseMySuffix> {
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
     * Convert a returned JSON object to PropostaTeseMySuffix.
     */
    private convertItemFromServer(json: any): PropostaTeseMySuffix {
        const entity: PropostaTeseMySuffix = Object.assign(new PropostaTeseMySuffix(), json);
        return entity;
    }

    /**
     * Convert a PropostaTeseMySuffix to a JSON which can be sent to the server.
     */
    private convert(propostaTese: PropostaTeseMySuffix): PropostaTeseMySuffix {
        const copy: PropostaTeseMySuffix = Object.assign({}, propostaTese);
        return copy;
    }
}

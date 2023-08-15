import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../util/request-util';
import { IMinistere } from '../model/ministere';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

type EntityResponseType = HttpResponse<IMinistere>;
type EntityArrayResponseType = HttpResponse<IMinistere[]>;

const resourceUrl = environment.ministereResource;

@Injectable({
  providedIn: 'root'
})
export class MinistereService {
  constructor(private http: HttpClient) {}

  create(ministere: IMinistere): Observable<EntityResponseType> {
    return this.http.post<IMinistere>(resourceUrl, ministere, { observe: 'response' });
  }

  update(ministere: IMinistere): Observable<EntityResponseType> {
    return this.http.put<IMinistere>(resourceUrl+'/'+ministere.id, ministere, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMinistere>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMinistere[]>(resourceUrl, { params: options, observe: 'response' });
  }

   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IMinistere[]>(resourceUrl, { observe: 'response' });
  }

  delete(idMinistere: number): Observable<HttpResponse<{}>> {
    console.log("activité supprimer -------------", idMinistere)
    return this.http.delete(`${resourceUrl}/${idMinistere}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IMinistere[]>(resourceUrl, { observe: 'response' });
  }
}

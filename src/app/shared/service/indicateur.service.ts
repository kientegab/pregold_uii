import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIndicateur } from '../model/indicateur';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IIndicateur>;
type EntityArrayResponseType = HttpResponse<IIndicateur[]>;

const resourceUrl = environment.indicateurResource;

@Injectable({
  providedIn: 'root'
})
export class IndicateurService {

  constructor(private http: HttpClient) {}

  create(Indicateur: IIndicateur): Observable<EntityResponseType> {
    return this.http.post<IIndicateur>(resourceUrl, Indicateur, { observe: 'response' });
  }

  update(Indicateur: IIndicateur): Observable<EntityResponseType> {
    return this.http.put<IIndicateur>(resourceUrl+'/'+Indicateur.id, Indicateur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIndicateur>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIndicateur[]>(resourceUrl, { params: options, observe: 'response' });
  }

   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IIndicateur[]>(resourceUrl, { observe: 'response' });
  }

  delete(idIndicateur: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${idIndicateur}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IIndicateur[]>(resourceUrl, { observe: 'response' });
  }
}

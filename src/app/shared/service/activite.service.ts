import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';
import { IActivite } from '../model/activite';

type EntityResponseType = HttpResponse<IActivite>;
type EntityArrayResponseType = HttpResponse<IActivite[]>;

const resourceUrl = environment.activiteResource;

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private http: HttpClient) {}

  create(Activite: IActivite): Observable<EntityResponseType> {
    return this.http.post<IActivite>(resourceUrl, Activite, { observe: 'response' });
  }

  update(Activite: IActivite): Observable<EntityResponseType> {
    return this.http.put<IActivite>(resourceUrl+'/'+Activite.id, Activite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActivite>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActivite[]>(resourceUrl, { params: options, observe: 'response' });
  }

   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IActivite[]>(resourceUrl, { observe: 'response' });
  }

  delete(idActivite: number): Observable<HttpResponse<{}>> {
    console.log("activité supprimer -------------", idActivite)
    return this.http.delete(`${resourceUrl}/${idActivite}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IActivite[]>(resourceUrl, { observe: 'response' });
  }
}

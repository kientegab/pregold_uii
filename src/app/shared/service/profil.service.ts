import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfil } from '../model/profil';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IProfil>;
type EntityArrayResponseType = HttpResponse<IProfil[]>;

const resourceUrl = environment.profilResource;

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) {}

  create(Profil: IProfil): Observable<EntityResponseType> {
    return this.http.post<IProfil>(resourceUrl, Profil, { observe: 'response' });
  }

  update(Profil: IProfil): Observable<EntityResponseType> {
    return this.http.put<IProfil>(resourceUrl+'/'+Profil.id, Profil, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfil>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfil[]>(resourceUrl, { params: options, observe: 'response' });
  }

   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IProfil[]>(resourceUrl, { observe: 'response' });
  }

  delete(idProfil: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${idProfil}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IProfil[]>(resourceUrl, { observe: 'response' });
  }
}


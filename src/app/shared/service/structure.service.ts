import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStructure } from '../model/structure';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<IStructure>;
type EntityArrayResponseType = HttpResponse<IStructure[]>;

const resourceUrl = environment.structureResource;

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  constructor(private http: HttpClient) {}

  create(Structure: IStructure): Observable<EntityResponseType> {
    return this.http.post<IStructure>(resourceUrl, Structure, { observe: 'response' });
  }

  update(Structure: IStructure): Observable<EntityResponseType> {
    return this.http.put<IStructure>(resourceUrl+'/'+Structure.id, Structure, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStructure>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStructure[]>(resourceUrl, { params: options, observe: 'response' });
  }

   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IStructure[]>(resourceUrl, { observe: 'response' });
  }

  delete(idStructure: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${idStructure}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IStructure[]>(resourceUrl, { observe: 'response' });
  }
}

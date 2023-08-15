import { Injectable } from '@angular/core';
import { IDocument } from '../model/document';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';


type EntityResponseType = HttpResponse<IDocument>;
type EntityArrayResponseType = HttpResponse<IDocument[]>;

const resourceUrl = environment.documentResource;
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) {}

  create(DocumentIDocument: IDocument): Observable<EntityResponseType> {
    return this.http.post<IDocument>(resourceUrl, DocumentIDocument, { observe: 'response' });
  }

  update(DocumentIDocument: IDocument): Observable<EntityResponseType> {
    return this.http.put<IDocument>(resourceUrl+'/'+DocumentIDocument.id, DocumentIDocument, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocument>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocument[]>(resourceUrl, { params: options, observe: 'response' });
  }

   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IDocument[]>(resourceUrl, { observe: 'response' });
  }

  delete(idDocumentIDocument: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${idDocumentIDocument}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IDocument[]>(resourceUrl, { observe: 'response' });
  }
  getDownloadLink(documentId: number): string {
    // Construisez l'URL de téléchargement en fonction de l'identifiant du document
    return `${resourceUrl}/${documentId}/download`;
  }
  
}

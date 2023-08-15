import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, catchError, throwError,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../model/user';
import { createRequestOption } from '../util/request-util';


type EntityResponseType = HttpResponse<IUser>;
type EntityArrayResponseType = HttpResponse<IUser[]>;

const resourceUrl = environment.userResource;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(User: IUser): Observable<EntityResponseType> {
    return this.http.post<IUser>(resourceUrl, User, { observe: 'response' });
  }

  login(matricule: string, password: string): Observable<any> {
    const credentials = { matricule, password };
    return this.http.post<any>(`${resourceUrl}/connexion`, credentials, { observe: 'response' })
      .pipe(
        catchError((response: HttpResponse<any>) => {
          if (response.status === 401) {
            return throwError('Matricule ou mot de passe incorrect.');
          }
          return of(response);
        })
      );
  }
  

  update(User: IUser): Observable<EntityResponseType> {
    return this.http.put<IUser>(resourceUrl+'/'+User.id, User, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUser>(`${resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(resourceUrl, { params: options, observe: 'response' });
  }

   findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IUser[]>(resourceUrl, { observe: 'response' });
  }

  delete(idUser: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${resourceUrl}/${idUser}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IUser[]>(resourceUrl, { observe: 'response' });
  }
}

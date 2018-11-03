import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, Records } from './myhealth.digital.health';
/*import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';*/

@Injectable()
export class DataService<Type> {
    private resolveSuffix = '?resolve=true';
    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.actionUrl = '/api/';
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAll(ns: string): Observable<Records[]> {
      console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
      return this.http.get<Records>(`${this.actionUrl}${ns}`).pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

    public getSingle(ns: string, id: string): Observable<Type> {
        console.log('GetSingle ' + ns);
        return this.http.get<Type>(this.actionUrl + ns + '/' + id + this.resolveSuffix).pipe(
          map(this.extractData),
          catchError(this.handleError)
        );
    }

    public add(ns: string, asset: Type): Observable<Type> {
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);

        return this.http.post(this.actionUrl + ns, asset).pipe(
          map(this.extractData),
          catchError(this.handleError)
        );
    }

    public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        return this.http.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate).pipe(
          map(this.extractData),
          catchError(this.handleError)
        );
    }

    public delete(ns: string, id: string): Observable<Type> {
        console.log('Delete ' + ns);

        return this.http.delete(this.actionUrl + ns + '/' + id).pipe(
          map(this.extractData),
          catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<string> {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }

    private extractData(res: Response): any {
        return res;
    }

}

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '@angular/compiler/src/core';
import { User, Professional } from './myhealth.digital.health';

@Injectable()
export class RestService {

  constructor(private httpClient: HttpClient) {
  }

  checkWallet(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/wallet', {withCredentials: true});
  }

  signUp(data, ns) {
    const url = 'http://localhost:3001/api/myhealth.digital.health.' + ns;
    return this.httpClient.post(url, data).toPromise()
      .then(() => {
        const identity = {
          participant: 'myhealth.digital.health.' + ns + '#' + data.Id,
          userID: data.Id,
          options: {}
        };

        return this.httpClient.post('http://localhost:3001/api/system/identities/issue', identity, {responseType: 'blob'}).toPromise();
      })
      .then((cardData) => {
      console.log('CARD-DATA', cardData);
        const file = new File([cardData], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});

        const formData = new FormData();
        formData.append('card', file);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post('http://localhost:3000/api/wallet/import', formData, {
          withCredentials: true,
          headers
        }).toPromise();
      });
  }

  getCurrentUser(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/system/ping', {withCredentials: true});
  }

}

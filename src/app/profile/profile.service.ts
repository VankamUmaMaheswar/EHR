import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { User } from '../myhealth.digital.health';
import { HttpResponse } from '@angular/common/http';

// Can be injected into a constructor
@Injectable()
export class ProfileService {

  private NAMESPACE = 'User';

  constructor(private dataService: DataService<User>) {
  }

  public getparticipant(id: any): Observable<User> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<User> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<User> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<User> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

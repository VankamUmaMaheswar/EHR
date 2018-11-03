import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Professional } from '../myhealth.digital.health';


// Can be injected into a constructor
@Injectable()
export class ProfessionalService {

  private NAMESPACE = 'Professional';

  constructor(private dataService: DataService<Professional>) {
  }

  public getparticipant(id: any): Observable<Professional> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Professional> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Professional> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Professional> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

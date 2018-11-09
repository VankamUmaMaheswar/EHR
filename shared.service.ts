import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  myId: string;

  constructor() { }


  setId(id: string) {
    this.myId = id;
  }

  getId() {
    return this.myId;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private dataSubject = new Subject<any>();

  sendData(data: number) {
    this.dataSubject.next(data);
  }

  getId() {
    return this.dataSubject.asObservable();
  }
}

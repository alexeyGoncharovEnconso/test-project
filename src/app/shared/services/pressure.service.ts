import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PressureService {

  readonly currentPressure$ = new BehaviorSubject<number>(0)

  constructor() { }

  changePressure(value: number) {
    this.currentPressure$.next(value)
  }

}

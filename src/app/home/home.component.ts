import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { PressureService } from '../shared/services/pressure.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentValue$?: Observable<number>
  constructor(private pressureService: PressureService) { }

  ngOnInit() {
    this.currentValue$ = this.pressureService.currentPressure$
  }

  setPressure(event: MatSliderChange) {
    this.pressureService.changePressure(event.value || 0)
  }

}

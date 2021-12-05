import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PressureService } from '../../services/pressure.service';

export type GaugeType = 'circle' | 'arc'

@Component({
  selector: 'app-round-gauge',
  templateUrl: './round-gauge.component.html',
  styleUrls: ['./round-gauge.component.scss']
})
export class RoundGaugeComponent implements OnInit, OnChanges {

  @Input() type: GaugeType = 'circle';
  @Input() maxValue: number = 20;
  @Input() minValue: number = 0;

  arcLength: number = 180;
  startAngle: number = 180;

  currentPressure$?: Observable<number>

  constructor( private pressureService: PressureService) { }

  ngOnInit() {
    this.currentPressure$ = this.pressureService.currentPressure$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'].currentValue !== changes['type'].previousValue) {
      this.setGaugeOptions()
    }
  }

  valueChanged(event: Event) {
    this.pressureService.changePressure((event as CustomEvent).detail.value)
  }

  private setGaugeOptions() {
    switch (this.type) {
      case 'arc': 
        this.arcLength = 180;
        this.startAngle = 180;
        break;
      case 'circle':
        this.arcLength = 360;
        this.startAngle = 90;
        break;
    }
  }
}

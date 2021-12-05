import { Component, OnInit } from '@angular/core';
import { GaugeType } from '../../round-gauge/round-gauge.component';

@Component({
  selector: 'app-widget-item-with-header',
  templateUrl: './widget-item-with-header.component.html',
  styleUrls: ['./widget-item-with-header.component.scss']
})
export class WidgetItemWithHeaderComponent implements OnInit {

  constructor() { }

  gaugeType: GaugeType = 'arc'

  ngOnInit() {
  }

  onMenuClick($event: MouseEvent | TouchEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.gaugeType = this.gaugeType === 'circle' ? 'arc' : 'circle'
  }
}

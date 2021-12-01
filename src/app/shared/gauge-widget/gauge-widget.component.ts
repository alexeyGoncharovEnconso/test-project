import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-widget',
  templateUrl: './gauge-widget.component.html',
  styleUrls: ['./gauge-widget.component.scss']
})
export class GaugeWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onMenuClick($event: MouseEvent | TouchEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('Menu button clicked');
  }

}

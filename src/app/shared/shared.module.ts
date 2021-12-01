import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
import { GaugeWidgetComponent } from './gauge-widget/gauge-widget.component';

@NgModule({
  imports: [
    CommonModule,
    GridsterModule 
  ],
  declarations: [WidgetPanelComponent, GaugeWidgetComponent],
  exports: [WidgetPanelComponent, GaugeWidgetComponent]
})
export class SharedModule { }

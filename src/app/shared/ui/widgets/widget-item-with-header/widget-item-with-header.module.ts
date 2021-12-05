import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetItemWithHeaderComponent } from './widget-item-with-header.component';
import { RoundGaugeModule } from '../../round-gauge/round-gauge.module';

@NgModule({
  imports: [
    CommonModule,
    RoundGaugeModule,
  ],
  declarations: [WidgetItemWithHeaderComponent],
  exports: [WidgetItemWithHeaderComponent]
})
export class WidgetItemWithHeaderModule { }

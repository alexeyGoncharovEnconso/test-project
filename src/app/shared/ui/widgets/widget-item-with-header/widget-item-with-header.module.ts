import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetItemWithHeaderComponent } from './widget-item-with-header.component';
import { RoundGaugeModule } from '../../round-gauge/round-gauge.module';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RoundGaugeModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [WidgetItemWithHeaderComponent],
  exports: [WidgetItemWithHeaderComponent]
})
export class WidgetItemWithHeaderModule { }

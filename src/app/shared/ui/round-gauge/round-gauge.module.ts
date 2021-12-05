import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundGaugeComponent } from './round-gauge.component';
import '@thomasloven/round-slider';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoundGaugeComponent],
  exports: [RoundGaugeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoundGaugeModule { }

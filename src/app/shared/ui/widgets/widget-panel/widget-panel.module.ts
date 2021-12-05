import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetPanelComponent } from './widget-panel.component';
import { GridsterModule } from 'angular-gridster2';
import { WidgetItemWithHeaderModule } from '../widget-item-with-header/widget-item-with-header.module';

@NgModule({
  imports: [
    CommonModule,
    GridsterModule,
    WidgetItemWithHeaderModule
  ],
  declarations: [WidgetPanelComponent],
  exports: [WidgetPanelComponent]
})
export class WidgetPanelModule { }

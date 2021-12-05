import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { WidgetPanelModule } from '../shared/ui/widgets/widget-panel/widget-panel.module';

@NgModule({
  imports: [
    CommonModule,
    WidgetPanelModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }

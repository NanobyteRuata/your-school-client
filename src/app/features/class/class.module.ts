import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesPageComponent } from './pages/classes-page/classes-page.component';
import { ClassRoutingModule } from './class-routing.module';

@NgModule({
  declarations: [ClassesPageComponent],
  imports: [ClassRoutingModule, CommonModule],
})
export class ClassModule {}

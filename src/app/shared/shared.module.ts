import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports : [
    NavbarComponent
  ]
})
export class SharedModule { }

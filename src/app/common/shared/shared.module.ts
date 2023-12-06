import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlankComponent } from '../components/blank/blank.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BlankComponent,
  ],
  exports:[
    CommonModule,
    RouterModule,
    FormsModule,
    BlankComponent,
    
  ]
})
export class SharedModule { }

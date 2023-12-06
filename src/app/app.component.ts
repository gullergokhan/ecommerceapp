import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#fff" type = "ball-clip-rotate" [fullScreen] = "true"><p style="color: white" > Lütfen bekleyiniz... </p></ngx-spinner>
  `,
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxSpinnerModule,],

})
export class AppComponent {
  title = 'ecommerceapp';
}

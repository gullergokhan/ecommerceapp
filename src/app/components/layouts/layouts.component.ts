import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/shared/shared.module';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [SharedModule,NavbarComponent,FooterComponent,SidebarComponent,],
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent {

}

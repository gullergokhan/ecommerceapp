import { Component } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoriesComponent } from "../categories/categories.component";
import { SliderComponent } from "../slider/slider.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [SharedModule, CategoriesComponent, SliderComponent]
})
export class HomeComponent {

}

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import 'hammerjs';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatChipsModule, MatInputModule,MatSelectModule,MatListModule,MatSliderModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatIconModule, MatChipsModule, MatInputModule,MatSelectModule,MatListModule,MatSliderModule],
})
export class MaterialModule { }
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatChipsModule, MatInputModule,MatSelectModule,MatListModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule, MatIconModule, MatChipsModule, MatInputModule,MatSelectModule,MatListModule],
})
export class MaterialModule { }
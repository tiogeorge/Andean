import { NgModule } from '@angular/core';
import { LoginComponent } from '../componentes/login/login.component';
import { PublicAuthGuard} from '../componentes/public-auth.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [PublicAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [PublicAuthGuard],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

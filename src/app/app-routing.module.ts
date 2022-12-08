import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ApiloginComponent } from './components/apilogin/apilogin.component';
import { ApiSignUpComponent } from './components/api-sign-up/api-sign-up.component';
import { AddUserComponent } from './components/add-user/add-user.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: ApiloginComponent},
  {path: 'sign-up', component: ApiSignUpComponent},
  {path: 'dashboard', component: UserDashboardComponent},
  {path: 'addUser', component: AddUserComponent}
];




@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

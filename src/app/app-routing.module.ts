import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './user/signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AddNoteComponent } from './user/add-note/add-note.component';
import { EditNoteComponent } from './user/edit-note/edit-note.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"",redirectTo:'/home',pathMatch:'full'},
  {path:"dashboard",component:DashboardComponent},
  {path:"notes/add",component:AddNoteComponent},
  {path:"notes/edit/:id",component:EditNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

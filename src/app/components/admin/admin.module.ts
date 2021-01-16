import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.servises";

@NgModule({
  declarations: [LayoutComponent, LoginPageComponent, DashboardComponent, CreateComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component:  LoginPageComponent},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'create', component: CreateComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: []

})

export class AdminModule {

}

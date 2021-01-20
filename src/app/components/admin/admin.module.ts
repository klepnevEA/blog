import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [LayoutComponent, SearchPipe, LoginPageComponent, DashboardComponent, CreateComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: LayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component:  LoginPageComponent},
          {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
          {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
          {path: 'post/:id/edit', component: EditPostComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: []

})

export class AdminModule {

}

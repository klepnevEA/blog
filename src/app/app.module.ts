import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { AdminModule } from './components/admin/admin.module';
import { PostComponent } from './components/post/post.component';
import { AuthService } from "./shared/services/auth.servises";
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    PostsComponent,
    PostComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

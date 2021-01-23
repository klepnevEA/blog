import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AdminModule } from './components/admin/admin.module';
import { PostComponent } from './components/post/post.component';
import { AuthService } from './shared/services/auth.services';
import { AuthGuard } from './shared/services/auth.guard';
import { PostService } from './shared/services/post.services';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { PostPageComponent } from './components/post-page/post-page.component';

registerLocaleData(localeRu, 'ru');

const INTERCEPTOR_PROVIRED: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    PostPageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
  ],
  providers: [AuthService, AuthGuard, PostService, INTERCEPTOR_PROVIRED,
    {provide: LOCALE_ID, useValue: 'ru'}],
  bootstrap: [AppComponent],
})
export class AppModule {}

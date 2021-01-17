import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './components/popup/popup.component';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './components/menu/menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PopupComponent, MenuComponent],
  imports: [
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    RouterModule],
  exports: [
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    PopupComponent,
    MenuComponent
  ]
})
export class SharedModule { }

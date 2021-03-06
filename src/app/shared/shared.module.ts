import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatTableModule} from '@angular/material/table'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';

import { MenuComponent } from './components/menu/menu.component';
import { PopupComponent } from './components/popup/popup.component';
import { PopupConfirmComponent } from './components/popup-confirm/popup-confirm.component';

@NgModule({
  declarations: [PopupComponent, MenuComponent, PopupConfirmComponent],
  imports: [
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    AngularEditorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule

    ],
  exports: [
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    PopupComponent,
    MenuComponent,
    AngularEditorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    PopupConfirmComponent
  ]
})
export class SharedModule { }

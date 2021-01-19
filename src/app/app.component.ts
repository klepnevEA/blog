import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './shared/services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
    ) {}
}

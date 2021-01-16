import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IContentPopup } from '../../interfaces';
import { AuthService } from '../../services/auth.servises';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  constructor(public authService: AuthService) {}

  @Input() contentText!:IContentPopup

  closePopup() {
    this.authService.showPopup$.next({text: '', title: ''})
    this.authService.submitetd = false
  }

}
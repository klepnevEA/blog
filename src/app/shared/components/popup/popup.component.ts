import { Component, Input } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { IContentPopup } from '../../interfaces';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  public content!: IContentPopup

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.showPopup$
    .subscribe((res)=> {
      this.content = res
    })
  }

  @Input() contentText!:IContentPopup

  closePopup() {
    this.authService.showPopup$.next({text: '', title: ''})
    this.authService.submited = false
  }

}

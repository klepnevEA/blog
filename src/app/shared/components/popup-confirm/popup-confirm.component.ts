import { Component } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.services';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent {

  public openPopup: boolean

  constructor(private postService: PostService) {
    this.openPopup = false
    this.postService.openPopupConfirm$.subscribe(response => {
      this.openPopup = response
    })
  }

  confirm(val: boolean) {
    this.postService.confirm.next(val)
    this.postService.openPopupConfirm$.next(false)
  }
}

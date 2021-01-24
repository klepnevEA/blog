import { Component, Input } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/services/post.services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post!: IPost

  constructor(private postService: PostService) { }
}

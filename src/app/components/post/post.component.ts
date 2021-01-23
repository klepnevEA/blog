import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/services/post.services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: IPost

  constructor(private postService: PostService) { }

  ngOnInit(): void {}

}

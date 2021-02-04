

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IPost } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/services/post.services';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post!: IPost

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(switchMap((params: Params)=> {
      return this.postService.getPostById(params['id'])
    })).subscribe((post: IPost)=> {
      this.post = post
    })
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.services';
import { PostService } from 'src/app/shared/services/post.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService) { }

  public posts: IPost[] = []
  private sub!: Subscription
  searchStr = ''

  public dataTable: any
  ngOnInit(): void {
    this.sub = this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts
      }
    )
  }

  // remove(id: string) {

  // }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
}

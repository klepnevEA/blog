import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
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
  private subDelete!: Subscription
  private subConfirm!: Subscription
  public searchStr = ''
  public dataTable!: IPost[]
  public startIndex!: number
  public endIndex!: number
  public paginationStartIndex: number = 10
  private postId!: string

  ngOnInit(): void {
    this.sub = this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts
      }
    )

    this.subConfirm = this.postService.confirm.subscribe(response => {
      if(response) {
        this.subDelete = this.postService.removePost(this.postId).subscribe(()=> {
          this.posts = this.posts.filter(post => post.id !== this.postId)
        })
      }
    })
  }


  pageClick(event: PageEvent): void {
    this.startIndex = event.pageIndex * event.pageSize
    this.endIndex = this.startIndex + event.pageSize
  }


  removePosts(postId: any) {
    this.postService.openPopupConfirm$.next(true)
    this.postId = postId
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }

    if(this.subDelete) {
      this.subDelete.unsubscribe()
    }

    if(this.subConfirm) {
      this.subConfirm.unsubscribe()
    }
  }
}

import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  searchStr = ''
  public dataTable!: IPost[]
  public startIndex!: number
  public endIndex!: number
  public paginationStartIndex: number = 10

  ngOnInit(): void {
    this.sub = this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts
      }
    )
  }


  pageClick(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize
    this.endIndex = this.startIndex + event.pageSize
  }

  // remove(id: string) {

  // }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
}

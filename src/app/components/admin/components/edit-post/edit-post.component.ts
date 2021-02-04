import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPost } from 'src/app/shared/interfaces';
import { PostService } from './../../../../shared/services/post.services';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  public posts: IPost[] = []
  public form!: FormGroup
  public post!: IPost
  private editSub!: Subscription
  private sub!: Subscription
  private subDelete!: Subscription
  private subConfirm!: Subscription
  private postId!: string

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

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
          this.router.navigate(['/admin', 'dashboard'])
        })
      }
    })


    this.route.params
    .pipe(switchMap((params: Params)=> {
      return this.postService.getPostById(params['id'])
    })).subscribe((post: IPost)=> {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        content: new FormControl(post.content, Validators.required),
        author: new FormControl(post.author, Validators.required),
        date: new FormControl(formatDate(new Date(post.date), 'full', 'ru'))
      })
      this.form.get("date")?.disable()
      this.form.get("author")?.disable()
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.editSub = this.postService.editPost({
      ...this.post,
      id: this.post.id,
      content: this.form.value.content,
      title: this.form.value.title
    }).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

  // removePosts(event: Event, postId: any) {
  //   event?.preventDefault()
  //   this.subDelete = this.postService.removePost(postId).subscribe(()=> {
  //     this.router.navigate(['/admin', 'dashboard'])
  //   })
  // }

  removePosts(event: Event, postId: any) {
    event?.preventDefault()
    this.postService.openPopupConfirm$.next(true)
    this.postId = postId
  }

  ngOnDestroy(): void {
    if(this.editSub) {
      this.editSub.unsubscribe()
    }

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

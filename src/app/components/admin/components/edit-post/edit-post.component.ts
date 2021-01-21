import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { switchMap } from 'rxjs/operators';
import { IPost } from 'src/app/shared/interfaces';
import { PostService } from './../../../../shared/services/post.services';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  form!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
    ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(switchMap((params: Params)=> {
      return this.postService.getOistById(params['id'])
    })).subscribe((post: IPost)=> {
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        content: new FormControl(post.content, Validators.required),
        author: new FormControl(post.author, Validators.required)
      })
    })
  }

  submit() {

  }

  editorConfig: AngularEditorConfig = {
    editable: true,
  };

}

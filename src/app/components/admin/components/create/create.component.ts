import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from 'src/app/shared/interfaces';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostService } from 'src/app/shared/services/post.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  addPost() {
    if (this.form.invalid) {
      return;
    }

    const post: IPost = {
      title: this.form.value.title,
      content: this.form.value.content,
      author: this.form.value.author,
      date: new Date(),
    };

    this.postService.create(post).subscribe(
      ()=> {
        this.router.navigate(['/admin', 'dashboard'])
        this.form.reset()
      }
    )
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
  };
}

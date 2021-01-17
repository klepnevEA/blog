import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public form!: FormGroup

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      author: new FormControl(null, [
        Validators.required
      ]),
      content: new FormControl(null, [
        Validators.required
      ])
    })
  }

  addPost() {
    if (this.form.invalid) {
      return
    }

      const post: IPost = {
        title: this.form.value.title,
        content: this.form.value.content,
        author: this.form.value.author,
        date: new Date()
      }
  }

}

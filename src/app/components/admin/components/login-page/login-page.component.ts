import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.services';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup
  public submitetd: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })

    // this.route.queryParams.subscribe((params: Params) => {
    //   this.authService.showPopup$.next({ title: 'Ошибочка', text: 'Введите данный заново' });
    // })
  }


  submitForm() {
    if (this.form.invalid) {
      return
    }
      this.authService.submitetd = true

      const user: IUser = {
        email: this.form.value.email,
        password: this.form.value.password,
      }

      this.authService.login(user).subscribe(()=> {
          this.router.navigate(['/admin', 'dashboard'])
          this.authService.submitetd = false
      }), () => {
        this.authService.submitetd = false
      }
  }

}

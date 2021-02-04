import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  constructor(
    private router: Router,
    public authService: AuthService,
    public route: ActivatedRoute
  ) {}

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login']);
  }
}

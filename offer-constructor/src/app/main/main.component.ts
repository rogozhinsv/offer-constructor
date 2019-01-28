import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/api-auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private _currentUser: User;
  public get CurrentUser(): User {
    return this._currentUser;
  }

  constructor(
    private srvcAuth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.srvcAuth.currentUser().subscribe(x => {
      this._currentUser = x.user;
    });
  }

  public btnLogoutClicked(event: any): void {
    this.srvcAuth.logout();
    window.location.reload();
  }
}

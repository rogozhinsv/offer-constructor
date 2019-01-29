import { Component, OnInit } from '@angular/core';
import { User } from '../../models/api-auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-right',
  templateUrl: './header-right.component.html',
  styleUrls: ['./header-right.component.scss']
})
export class HeaderRightComponent implements OnInit {

  private _currentUser: User;
  public get CurrentUser(): User {
    return this._currentUser;
  }

  constructor(
    private srvcAuth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.srvcAuth.isAuth().subscribe(x => {
      if (x) {
        this.srvcAuth.currentUser().subscribe(x => {
          this._currentUser = x.user;
        });
      }
      else {
        this._currentUser = null;
      }
    });

  }

  public btnLogoutClicked(event: any): void {
    this.srvcAuth.logout();
    window.location.reload();
  }

}

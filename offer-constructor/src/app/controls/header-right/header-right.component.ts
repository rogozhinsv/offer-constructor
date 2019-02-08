import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/api-auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserProfileMenuService } from '../../services/user-profile-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-right',
  templateUrl: './header-right.component.html',
  styleUrls: ['./header-right.component.scss']
})
export class HeaderRightComponent implements OnInit, OnDestroy {
  private _subscrptLoginNotify: Subscription;

  private _currentUser: User;
  public get CurrentUser(): User {
    return this._currentUser;
  }

  constructor(
    private srvcAuth: AuthService,
    private srvcUserProfileMenu: UserProfileMenuService
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

    this.srvcAuth.loginActionNotifyState$.subscribe(() => {
      this.srvcAuth.currentUser().subscribe(x => {
        this._currentUser = x.user;
      });
    });
  }

  ngOnDestroy() {
    if (this._subscrptLoginNotify) {
      this._subscrptLoginNotify.unsubscribe();
    }
  }

  public btnLogoutClicked(event: any): void {
    this.srvcAuth.logout();
    window.location.reload();
  }

  public showLoginComponent(): void {
    this.srvcUserProfileMenu.setLoginComponentVisibility(true);
  }
}

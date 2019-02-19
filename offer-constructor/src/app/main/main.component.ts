import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfileMenuService } from '../services/user-profile-menu.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private _isVisibleLoginComponent: boolean = false;
  public get IsVisibleLoginComponent(): boolean {
    return this._isVisibleLoginComponent;
  }

  private _isVisibleProfileComponent: boolean = false;
  public get IsVisibleProfileComponent(): boolean {
    return this._isVisibleProfileComponent;
  }

  private _isVisibleRegisterComponent: boolean = false;
  public get IsVisibleRegisterComponent(): boolean {
    return this._isVisibleRegisterComponent;
  }

  private _subscrptLoginVisibility: Subscription;
  private _subscrtpRegisterVisibility: Subscription;
  private _subscrptProfileVisibility: Subscription;

  constructor(
    private srvcUserProfileMenuService: UserProfileMenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["action"] == "login") {
        this._isVisibleLoginComponent = true;
      }
      else if (params["action"] == "register") {
        this._isVisibleRegisterComponent = true;
      }
      else if (params["action"] == "personal") {
        this._isVisibleProfileComponent = true;
      }
    });

    this._subscrptLoginVisibility = this.srvcUserProfileMenuService.loginComponentVisibilityState$.subscribe((value: boolean) => {
      this._isVisibleRegisterComponent = this._isVisibleProfileComponent = false;

      this._isVisibleLoginComponent = value;
    });
    this._subscrtpRegisterVisibility = this.srvcUserProfileMenuService.registerComponentVisibilityState$.subscribe((value: boolean) => {
      this._isVisibleLoginComponent = this._isVisibleProfileComponent = false;

      this._isVisibleRegisterComponent = value;
    });
    this._subscrptProfileVisibility = this.srvcUserProfileMenuService.profileComponentVisibilityState$.subscribe((value: boolean) => {
      this._isVisibleLoginComponent = this._isVisibleRegisterComponent = false;

      this._isVisibleProfileComponent = value;
    })
  }

  ngOnDestroy() {
    if (this._subscrptLoginVisibility) {
      this._subscrptLoginVisibility.unsubscribe();
    }
    if (this._subscrtpRegisterVisibility) {
      this._subscrtpRegisterVisibility.unsubscribe();
    }
    if (this._subscrptProfileVisibility) {
      this._subscrptProfileVisibility.unsubscribe();
    }
  }
}

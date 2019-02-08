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

  private _subscrptLoginVisibility: Subscription;

  constructor(
    private srvcUserProfileMenuService: UserProfileMenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["action"] == "login") {
        this._isVisibleLoginComponent = true;
      }
    });

    this._subscrptLoginVisibility = this.srvcUserProfileMenuService.loginComponentVisibilityState$.subscribe((value: boolean) => {
      this._isVisibleLoginComponent = value;
    });
  }

  ngOnDestroy() {
    if (this._subscrptLoginVisibility) {
      this._subscrptLoginVisibility.unsubscribe();
    }
  }
}

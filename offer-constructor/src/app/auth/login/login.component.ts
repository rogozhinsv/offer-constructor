import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginUserResponse } from '../../models/api-auth';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileMenuService } from '../../services/user-profile-menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("tbxLoginInput") tbxLoginInput: ElementRef;

  private loginFormGroup: FormGroup;

  constructor(
    private srvcAuth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srvcUserProfileMenu: UserProfileMenuService
  ) { }

  ngOnInit() {
    this.tbxLoginInput.nativeElement.focus();
    this.initForm();
  }

  private initForm(): void {
    this.loginFormGroup = this.formBuilder.group({
      "email": [null, [Validators.required]],
      "password": [null, [Validators.required]]
    })
  }

  public onSubmit(): void {
    if (this.loginFormGroup.valid) {
      this.srvcAuth.login(this.loginFormGroup.controls.email.value, this.loginFormGroup.controls.password.value).subscribe((data: LoginUserResponse) => {
        if (data.result) {
          localStorage.setItem('offerConstructoJwtToken', data.token);

          this.route.queryParams.subscribe(params => {
            if (params["src"]) {
              this.router.navigate([decodeURI(params["src"])]);
            }
            else {
              this.srvcUserProfileMenu.setLoginComponentVisibility(false);
              this.srvcAuth.notifyAboutLogin();
            }
          });
        }
        else {
          this.loginFormGroup.controls.password.setErrors({ invalidAccount: true });
        }
      });
    }
    else {
      this.loginFormGroup.controls.email.markAsTouched();
      this.loginFormGroup.controls.password.markAsTouched();
    }
  }
}

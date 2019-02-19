import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { } from "rxjs/operators";
import { RegisterUserResponse } from 'src/app/models/api-auth';
import { UserProfileMenuService } from 'src/app/services/user-profile-menu.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild("tbxLoginInput") tbxLoginInput: ElementRef;

  public registerFormGroup: FormGroup;

  constructor(
    private srvcAuth: AuthService,
    private srvcUserMenu: UserProfileMenuService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.tbxLoginInput.nativeElement.focus();
    this.initForm();
  }

  private initForm(): void {
    this.registerFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  public btnLoginClicked(event: any): void {
    this.srvcUserMenu.setRegisterComponentVisibility(false);
    this.srvcUserMenu.setLoginComponentVisibility(true);
  }

  public closeForm(): void {
    this.srvcUserMenu.setRegisterComponentVisibility(false);
  }

  public onSubmit(): void {
    if (this.registerFormGroup.valid) {
      this.srvcAuth.isUserExist(this.registerFormGroup.controls.email.value).subscribe(x => {
        if (x.result) {
          this.registerFormGroup.controls.email.setErrors({ "userExist": true });
        }
        else {
          this.srvcAuth.register(this.registerFormGroup.controls.email.value, this.registerFormGroup.controls.password.value).subscribe((data: RegisterUserResponse) => {
            if (data.result) {
              this.router.navigate(["/"], { queryParams: { action: "personal" } });
            }
          });
        }
      });
    }
    else {
      this.registerFormGroup.controls.email.markAsTouched();
      this.registerFormGroup.controls.password.markAsTouched();
    }
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ExistUserResponse, RegisterUserResponse } from '../../models/api-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild("tbxLoginInput") tbxLoginInput: ElementRef;

  public tbxLogin: string;
  public tbxPassword: string;

  private _registrationError: string;
  public get RegistrationError(): string {
    return this._registrationError;
  }

  constructor(
    private srvcAuth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tbxLoginInput.nativeElement.focus();
  }

  public onRegisterClick(event: any): void {
    this._registrationError = "";
    if (this.tbxLogin && this.tbxPassword) {
      this.srvcAuth.isUserExist(this.tbxLogin).subscribe((data: ExistUserResponse) => {
        if (data.result) {
          this._registrationError = "Пользователь с данным логином уже существует."
        }
        else {
          this.srvcAuth.register(this.tbxLogin, this.tbxPassword).subscribe((data: RegisterUserResponse) => {
            if (data.result) {
              this.router.navigate(["/"]);
            }
            else {
              this._registrationError = "error";
            }
          })
        }
      });
    }
  }

}

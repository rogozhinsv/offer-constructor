import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginUserResponse } from '../../models/api-auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("tbxLoginInput") tbxLoginInput: ElementRef;

  private _loginError: string;
  public get LoginError(): string {
    return this._loginError;
  }

  public tbxLogin: string;
  public tbxPassword: string;

  constructor(
    private srvcAuth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tbxLoginInput.nativeElement.focus();
  }

  public onLoginClick(event: any): void {
    this._loginError = "";

    if (this.tbxLogin && this.tbxPassword) {
      this.srvcAuth.login(this.tbxLogin, this.tbxPassword).subscribe((data: LoginUserResponse) => {
        if (data.result) {
          localStorage.setItem('offerConstructoJwtToken', data.token);

          this.route.queryParams.subscribe(params => {
            let src = params["src"] || "/";
            this.router.navigate([decodeURI(src)]);
          });
        }
        else {
          this._loginError = "Неверный логин/пароль.";
        }
      });
    }
  }

}

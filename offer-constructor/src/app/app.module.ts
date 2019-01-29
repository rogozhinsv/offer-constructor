import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './routing/app-route';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './auth/auth.interceptor';
import { PersonalComponent } from './personal/personal.component';
import { HeaderComponent } from './controls/header/header.component';
import { HeaderRightComponent } from './controls/header-right/header-right.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    PersonalComponent,
    HeaderComponent,
    HeaderRightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

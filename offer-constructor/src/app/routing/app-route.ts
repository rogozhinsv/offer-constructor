import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { MainComponent } from '../main/main.component';
import { PersonalComponent } from '../personal/personal.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: "register", component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'personal', component: PersonalComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }

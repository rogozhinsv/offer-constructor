import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ExistUserResponse, RegisterUserResponse, LoginUserResponse, CurrentUserResponse, User } from "../models/api-auth";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private srvcHttpClient: HttpClient) { }

    public isAuth(): boolean {
        return false;
    }

    public getUserName(user: User): string {
        let result = "";
        if (user) {
            if (user.lastname && user.firstname) {
                result = user.firstname + " " + user.lastname
            }
            else if (user.lastname) {
                result = user.lastname;
            }
            else if (user.firstname) {
                result = user.firstname;
            }
            else {
                result = user.email;
            }
        }

        return result;
    }

    public isUserExist(email: string): Observable<ExistUserResponse> {
        let url = environment.api + "/existUser";

        let request = {
            "login": email
        };

        return this.srvcHttpClient.post<any>(url, request);
    }

    public login(email: string, password: string): Observable<LoginUserResponse> {
        let url = environment.api + "/signin";
        let request = {
            "login": email,
            "password": password
        };

        return this.srvcHttpClient.post<any>(url, request);
    }

    public currentUser(): Observable<CurrentUserResponse> {
        let url = environment.api + "/currentUser";

        return this.srvcHttpClient.get<any>(url);
    }

    public getToken(): string {
        return localStorage.getItem("offerConstructoJwtToken");
    }

    public logout(): void {
        localStorage.removeItem('offerConstructoJwtToken');
    }

    public register(email: string, password: string): Observable<RegisterUserResponse> {
        let url = environment.api + "/register";
        let request = {
            "login": email,
            "password": password
        };

        return this.srvcHttpClient.post<any>(url, request);
    }
}
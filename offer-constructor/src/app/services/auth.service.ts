import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ExistUserResponse, RegisterUserResponse, LoginUserResponse } from "../models/api-auth";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private srvcHttpClient: HttpClient) { }

    public isAuth(): boolean {
        return false;
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

    public register(email: string, password: string): Observable<RegisterUserResponse> {
        let url = environment.api + "/register";
        let request = {
            "login": email,
            "password": password
        };

        return this.srvcHttpClient.post<any>(url, request);
    }
}
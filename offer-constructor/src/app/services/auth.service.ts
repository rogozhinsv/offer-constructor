import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ExistUserResponse, RegisterUserResponse, LoginUserResponse, CurrentUserResponse, User, UpdateUserResponse } from "../models/api-auth";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private srvcHttpClient: HttpClient) { }

    public isAuth(): Observable<boolean> {
        let url = environment.api + "/isAuth";
        return this.srvcHttpClient.get<any>(url);
    }

    public getAvatarImageAsBase64(user: User): string {
        if (user.avatar) {
            let result = this.arrayBufferToBase64(user.avatar.data);
            return 'data:image/png;base64,' + result;
        }
        else {
            return null;
        }
    }

    private arrayBufferToBase64(buffer: any) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
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

    public updateUserInfo(data: any): Observable<UpdateUserResponse> {
        let url = environment.api + "/updateUserInfo";

        return this.srvcHttpClient.post<any>(url, data);
    }

    public updateUserAvatar(userId: number, data: File): Observable<UpdateUserResponse> {
        let url = environment.api + "/updateUserAvatar";

        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');


        let dataToUpload = new FormData();
        dataToUpload.append("id", userId.toString());
        dataToUpload.append("file", data);

        return this.srvcHttpClient.post<any>(url, dataToUpload, { headers: headers });
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
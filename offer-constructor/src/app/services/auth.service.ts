import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, Subject } from "rxjs";
import { ExistUserResponse, RegisterUserResponse, LoginUserResponse, CurrentUserResponse, UpdateUserResponse, User } from "../models/api-auth";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private _loginActionSubject: Subject<void> = new Subject();
    public loginActionNotifyState$: Observable<void> = this._loginActionSubject.asObservable();

    constructor(
        private srvcHttpClient: HttpClient
    ) { }

    public isAuth(): Observable<boolean> {
        let url = environment.api + "/isAuth";
        return this.srvcHttpClient.get<any>(url);
    }

    public createUserAvatarLink(user: User): string {
        return environment.api + "/userPhoto/" + user.id;
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

    public notifyAboutLogin(): void {
        this._loginActionSubject.next();
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
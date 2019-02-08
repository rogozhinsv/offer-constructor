import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable(
    {
        providedIn: "root"
    }
)
export class UserProfileMenuService {
    private _loginComponentVisibilitySubject: Subject<boolean> = new Subject();
    private _registerComponentVisibilitySubject: Subject<boolean> = new Subject();
    private _profileComponentVisibilitySubject: Subject<boolean> = new Subject();

    public loginComponentVisibilityState$: Observable<boolean> = this._loginComponentVisibilitySubject.asObservable();
    public registerComponentVisibilityState$: Observable<boolean> = this._registerComponentVisibilitySubject.asObservable();
    public profileComponentVisibilityState$: Observable<boolean> = this._profileComponentVisibilitySubject.asObservable();

    constructor() { }IsVisibleLoginComponent

    public setLoginComponentVisibility(value: boolean): void {
        this._loginComponentVisibilitySubject.next(value);
    }

    public setRegisterComponentVisibility(value: boolean): void {
        this._registerComponentVisibilitySubject.next(value);
    }

    public setProfileComponentVisibility(value: boolean): void {
        this._profileComponentVisibilitySubject.next(value);
    }
}
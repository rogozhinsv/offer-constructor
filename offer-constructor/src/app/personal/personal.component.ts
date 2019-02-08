import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User, UpdateUserResponse } from '../models/api-auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploaderOptions } from '../controls/image-uploader/image-uploader.interfaces';
import { ImageUploaderComponent, Status } from '../controls/image-uploader/image-uploader.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  private _currentUser: User;
  public get CurrentUser(): User {
    return this._currentUser;
  }

  private _isEditingAvatar: boolean = false;
  public get IsEditingAvatar(): boolean {
    return this._isEditingAvatar;
  }

  @ViewChild('ctrlAvatar') ctrlAvatar: ImageUploaderComponent;

  public formGroupPersonal: FormGroup;
  public imgUploaderOption: ImageUploaderOptions = {
    thumbnailHeight: 250,
    thumbnailWidth: 250,
    allowedImageTypes: ['image/png', 'image/jpeg'],
    thumbnailResizeMode: 'fill',
    autoUpload: false,
    cropEnabled: false,
    uploadUrl: '',
    resizeOnLoad: false
  };

  constructor(
    private srvcAuth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initFormGroup();
  }

  ngOnInit() {
    this.srvcAuth.currentUser().subscribe(x => {
      this._currentUser = x.user;
      this.updateFormGroupValue();
    });
  }

  private updateFormGroupValue(): void {
    this.formGroupPersonal.setValue({
      lastname: this._currentUser.lastname,
      email: this._currentUser.email,
      firstname: this._currentUser.firstname,
      surname: this._currentUser.surname,
      id: this._currentUser.id
    });
  }

  private initFormGroup(): void {
    this.formGroupPersonal = this.formBuilder.group({
      lastname: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      id: [null, [Validators.required]],
      email: [{ value: null, disabled: true }]
    });
  }

  public onSubmit(): void {
    if (this.formGroupPersonal.valid) {
      this.srvcAuth.updateUserInfo(this.formGroupPersonal.value).subscribe(data => {
        this._currentUser = data.data;
        this.updateFormGroupValue();

        if (this.ctrlAvatar && this.ctrlAvatar.status == Status.Selected) {
          this.srvcAuth.updateUserAvatar(this._currentUser.id, this.ctrlAvatar.fileToUpload).subscribe(data => {
            this._currentUser.avatar = data.data.avatar;
            this._isEditingAvatar = false;
          });
        }
        else {
          this._isEditingAvatar = false;
        }
      });
    }
  }

  public onEditAvatar_Clicked(event: any): void {
    this._isEditingAvatar = true;
  }

  public onBtnCancel_Clicked(event: any): void {
    this.router.navigate(["/"]);
  }
}

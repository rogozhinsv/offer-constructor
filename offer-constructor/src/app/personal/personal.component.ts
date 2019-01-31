import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/api-auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploaderOptions } from '../controls/image-uploader/image-uploader.interfaces';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  private _currentUser: User;

  public formGroupPersonal: FormGroup;
  public imgUploaderOption: ImageUploaderOptions = {
    thumbnailHeight: 200,
    thumbnailWidth: 200,
    allowedImageTypes: ['image/png', 'image/jpeg'],
    thumbnailResizeMode: 'fill',
    autoUpload: false,
    cropEnabled: true,
    uploadUrl: '',
    resizeOnLoad: false
  };

  constructor(
    private srvcAuth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.initFormGroup();
  }

  ngOnInit() {
    this.srvcAuth.currentUser().subscribe(x => {
      this._currentUser = x.user;

      this.formGroupPersonal.setValue({
        lastName: this._currentUser.lastname,
        firstName: this._currentUser.firstname,
        surName: this._currentUser.surname
      });
    });
  }

  private initFormGroup(): void {
    this.formGroupPersonal = this.formBuilder.group({
      lastName: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      surName: [null, [Validators.required]]
    });
  }

  public onSubmit(): void {

  }

  public onUploadImage(event: any): void {

  }
}

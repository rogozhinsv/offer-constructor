import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/api-auth';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  private _currentUser: User;

  constructor(private srvcAuth: AuthService) { }

  ngOnInit() {
    this.srvcAuth.currentUser().subscribe(x => {
      this._currentUser = x.user;
    });
  }

}

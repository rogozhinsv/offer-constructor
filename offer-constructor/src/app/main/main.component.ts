import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public get IsAuth(): boolean {
    return this.srvcAuth.isAuth();
  }
  
  constructor(private srvcAuth: AuthService) { }

  ngOnInit() {
  }

}

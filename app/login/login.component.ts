import { DatasharedService } from './../datashared.service';
import { AutheticationProfileServiceService } from '../AutheticationProfileService.service';
import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular5-social-login';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignupTrigger: boolean;
  constructor( private socialAuthService: AuthService,
              private autheticationProfileServiceService: AutheticationProfileServiceService,
              private router: Router,
              private dataService: DatasharedService ) {}

  ngOnInit() {
  }

  signUpClicked() {
    this.isSignupTrigger = false;
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.autheticationProfileServiceService.getLoggedUserData()
        .subscribe(
          (loggeddata: any) => {
            if (loggeddata.Candidate[0].response[0].code === '50000') {
              this.isSignupTrigger = true;
           }
          }
        );
      }
    );
  }
}

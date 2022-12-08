import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ApiLoginModel } from './api-login.model';

@Component({
  selector: 'app-apilogin',
  templateUrl: './apilogin.component.html',
  styleUrls: ['./apilogin.component.css']
})
export class ApiloginComponent implements OnInit {

  public loginForm !: FormGroup;
  userModelObj : ApiLoginModel = new ApiLoginModel();
  userData !: any;


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [''],
    })
  }

  signIn() :void { 
    this.userModelObj.email = this.loginForm.value.email;
    this.userModelObj.password = this.loginForm.value.password;
    
    this.api.signInUser(this.userModelObj)
    .subscribe(res => {
      console.log(res);
      alert('Logged In Successfully!');
      this.loginForm.reset();
      this.router.navigate(['/dashboard']);
      
      
    }, err => {
      alert( JSON.stringify(err?.error ));
      console.log(err?.error)
    })
  }
}


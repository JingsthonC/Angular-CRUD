import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  public signUpForm !: FormGroup;


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      full_name: [''],
      email: [''],
      password: ['']
    });
  }

  signUp() {
    this.http.post<any>("http://localhost:5000/registered", this.signUpForm.value)
    .subscribe(res=> {
      alert ("Signed-up Successfully@");
      this.signUpForm.reset();
      this.router.navigate(['login']);
    }, err => {
      alert ("Something went wrong"); 
    })
  }

}

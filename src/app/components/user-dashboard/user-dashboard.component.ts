import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UserModel } from './user.model';
import { ApiService } from 'src/app/services/api.service';






@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  faEdit = faEdit;
  faTrash = faTrash;
  formValue !: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  userModelObj : UserModel = new UserModel();
  userData !: any;

    constructor(private formBuilder: FormBuilder, private api: ApiService) {
      
    }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      first_name : [''],
      last_name: [''],
      email: ['']
    })

    this.getUsers();
  }

  onClickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  
  postUserDetails() {
    this.userModelObj.first_name = this.formValue.value.first_name;
    this.userModelObj.last_name = this.formValue.value.last_name;
    this.userModelObj.email = this.formValue.value.email;

    this.api.postUser(this.userModelObj)
    .subscribe(res => {
      console.log(res);
      alert('User Added Successfully!');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset(); 
      this.getUsers(); // added lang
    }, err => {
      alert('Something went wrong!');
    })
  }

  getUsers() {
    this.api.getUser()
    .subscribe(res => {
      this.userData = res;   
    })
  }

  deleteUser(data: any) {
    this.api.deleteUser(data.id)
    .subscribe(res=>{
      alert('User Deleted');
      this.getUsers();
    })
  }
  onEdit(data: any) {

    this.showAdd = false;
    this.showUpdate = true;

    this.userModelObj.id = data.id;
    this.formValue.controls['first_name'].setValue(data.first_name);
    this.formValue.controls['last_name'].setValue(data.last_name);
    this.formValue.controls['email'].setValue(data.email); 
  }

  onUpdate(){
    this.userModelObj.first_name = this.formValue.value.first_name;
    this.userModelObj.last_name = this.formValue.value.last_name;
    this.userModelObj.email = this.formValue.value.email;

    this.api.updateUser(this.userModelObj, this.userModelObj.id)
    .subscribe(res=>{
      alert('Updated Successfully!');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset(); 
      this.getUsers(); // added lang
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Team3Service } from '../team3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
Signup:FormGroup;
  constructor(private fb:FormBuilder,private _router:Router ,private _data:Team3Service) { }

  ngOnInit() {
    this.Signup=this.fb.group({
      username:new FormControl(null, Validators.required),
      password:new FormControl(null, Validators.required)
    })
  }
  onLoginSubmit() {
    this._data.login(
      this.Signup.value.username,
      this.Signup.value.password
    );
    // alert(this.Signup.value.username);
    if (this._data.redirectURL) {
      this._router.navigateByUrl(this._data.redirectURL);
    } else
    {
      this._router.navigate(["/home"]);
    }
  }
    onSave1(){
      this._router.navigate(['']);
    }

  }


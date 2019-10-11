import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team3Service } from '../team3.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private _router:Router, private _data:Team3Service) { }
  visibleSidebar1;
  ngOnInit() {
  }
  onLogOut(){
    this._data.logout();
  }
  isLoggedIn(){
    return this._data.isLoggedIn;
  }
}

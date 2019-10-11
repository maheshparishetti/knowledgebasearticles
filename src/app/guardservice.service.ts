import { Injectable } from '@angular/core';
import { Team3Service } from './team3.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardserviceService implements CanActivate {

  constructor(private _data:Team3Service,private _router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){

      return this.isUserLoggedIn(state.url);
  }

  isUserLoggedIn(url:string):boolean{

    if(this._data.isLoggedIn){
      return true;
    }
    this._data.redirectURL=url;
    this._router.navigate(['/login']);
    return false;
  }
}

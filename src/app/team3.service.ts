import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Articles } from './article';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class Team3Service {
  concat: string;

  constructor(private _data: Team3Service, private _http: HttpClient, private _router: Router) { }
  currentuser;
  isAdmin: boolean;
  redirectURL: string;
  url1 = "https://7ccbe975.ngrok.io/api/KB/";


  url = this.url1+"GetArticles?getall=0&categ=";
  add_article: string =this.url1 +"InsertUpdateKBAricles";
  URLfetchDataById =this.url1 + 'GetKBArticlesById?ArticleId=';
  getArticles = this.url1 +"GetCategories";
  URLInsertUpdate =this.url1 + 'InsertUpdateKBAricles';
  readmore =this.url1 + "GetReadArticle?ArticleId=";
  pagination= this.url1 +"GetArticles?getall=0&categ=&";
  search = this.url1 +"GetArticles?getall=0&SearchString=";

  getAllData() {
    return this._http.get(this.url);
  }
  getCategories() {
    return this._http.get(this.getArticles);
  }
  addArticles(item) {

    let body = JSON.stringify(item);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.add_article, body, { headers: head });
  }

  // fetchDataById(id) {
  // // let path= 'GetKBArticlesById?ArticleId='+id;
  // // let body=JSON.stringify(path)
  // return this._http.get(this.URLfetchDataById + id);
  // }
  login(username: string, password: string) {
    if (username == 'admin' && password == '1234') {
      // alert('wtf');
      this.currentuser = {
        username: username,
        password: password,
        isAdmin: true
      };
      // console.log(this.currentuser);
      return;
    }
    {
      this.currentuser = {
        username: username,
        password: password,
        isAdmin: false
      };

    }


  }
  UpdateArticle(item) {
    console.log(item);
    let body = JSON.stringify(item);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.URLInsertUpdate, body, { headers: head });
  }
  // editarticle(data:any)
  // {
  //   let body=JSON.stringify(data);

  //  let head=new HttpHeaders().set('Content-Type','application/json');
  //   return this._http.post<Articles>(this.URLInsertUpdate,body);

  // }

  getArticleById(data) {
    return this._http.get(this.readmore + data);
  }

  public getArticleBySearch(value) {
    console.log(value);
    return this._http.get(this.search + value);
  }

  getPageByNumber(num) {
    this.concat = "categ=" + "&Page=" + num;
    return this._http.get(this.pagination + this.concat);
  }
  logout() {
    this.currentuser = null;
    this.redirectURL = "";
    this._router.navigate(['']);
  }
  get isLoggedIn(): boolean {
    return !!this.currentuser;
  }
}





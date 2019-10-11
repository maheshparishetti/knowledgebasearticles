import { Component, OnInit } from '@angular/core';
import { Team3Service } from 'src/app/team3.service';
import { Articles } from 'src/app/article';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DdlCatogoryName } from 'src/app/catogories';
import { Pagination } from 'src/app/pagination';

import { MenuItem } from 'primeng/api';
//import { lodas } from "@angular/core";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content1='#Readmore';
  menuItem:MenuItem[];
  AddForm: FormGroup;
  arrReadMore: any;
  updatedid: any;
  Page = 1;
  ngVariable: boolean = false;
  closeResult: string;
  Readmore:any
  arr: Articles[] = [];
  cat: DdlCatogoryName[] = [];
  arr1: Articles[] = [];
  fetchData: Articles[] = [];
  arrReadMor: Articles[] = [];
  arr3: any;
  all_arr: any;
  data: any;
  arr2: any;
  page: any;
  totalItem: number;

  totalPages: number;
  all_articles: number;
  pageSize: number;
  display:boolean=false;
  display1:boolean=false;

   constructor(private _route: Router, private _data: Team3Service, private modalService: NgbModal, private fb: FormBuilder, private act: ActivatedRoute, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;

  }

  ngOnInit() {
      // menu
      this.menuItem = [
        {
            label: 'Add',

            items: [{
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Add Aricles',
                        command: (click:any) => {
                          this.display = true;
                        }},
                        {label: 'Add Another',
                        command: (click:any) => {
                          this.display = true;

                        }},
                        {label:'Quit'}
                    ]
                },
                //{label: 'Open'},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Edit article', icon: 'pi pi-fw pi-edit',
                command: (click:any) => {
                  this.display1 = true;
                //
                }},
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
            ],

            // command: (click:any) => {

            //   this.modalService.open(this.content1,{size:"lg"});
            // }
        },
        {
          label: 'Readmore',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Edit article', icon: 'pi pi-fw pi-edit',
              command: (click:any) => {
                this.display1 = true;
              //
              }},
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          ],

          // command: (click:any) => {

          //   this.modalService.open(this.content1,{size:"lg"});
          // }
      }
    ];
      // end




    // alert(this.totalItem)
    this.AddForm = this.fb.group({
      articleName: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      createdBy: new FormControl(null, Validators.required),
      previewContent: new FormControl(null),
      articleId: new FormControl(null),
      categoryName: new FormControl(null),
      createdByName: new FormControl(null),
      createdDate: new FormControl(null),
      modifiedBy: new FormControl(null),
      modifiedByName: new FormControl(null),
      modifiedDate: new FormControl(null),
      categoryId: new FormControl(null, Validators.required),

    })
    //
    this.getArticles();
    this.getPageInformation();
    this.getAllCategories();
  }

  open(content) {
    this.AddForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  getArticles() {
    this._data.getAllData().forEach(
      (data: Articles[]) => {
        this.arr = data;
        console.log(this.arr);
        this.page = data['pagerInfo'];
        this.totalItem = this.page.totalItems;
        console.log(this.totalItem);
        this.totalPages = this.page.totalPages;
        console.log(this.totalPages);
        // this.totalItems = this.page.itemsPerPage;
        this.all_arr = this.arr['kbArticles'];
        console.log(this.all_arr);


      },
    );
  }
  onDelete() {
    //this._data.deletItem()
  }

  getAllCategories() {
    this._data.getCategories().subscribe(
      (x: DdlCatogoryName[]) => {
        this.cat = x;
        console.log(this.cat);

      });
  }



  OnAddArticleSave(item) {


    this._data.addArticles(item
      // new Articles(
      //   this.AddForm.value.articleId,
      //   this.AddForm.value.articleName,
      //   this.AddForm.value.content,
      //   this.AddForm.value.previewContent,
      //   this.AddForm.value.categoryId,
      //   this.AddForm.value.categoryName,
      //   this.AddForm.value.createdBy,
      //   this.AddForm.value.createdByName,
      //   this.AddForm.value.createdDate,
      //   this.AddForm.value.modifiedBy,
      //   this.AddForm.value.modifiedByName,
      //   this.AddForm.value.modifiedDate
      // )
    ).subscribe(
      (data: Articles[]) => {
        this.arr1 = data;
        console.log(this.arr1);
        this.getArticles();
        alert("Added successfully");
      }

    );
    this.AddForm.reset();
    this.modalService.dismissAll();

  }

  openEditPopup(Editpopup, item) {
    console.log(this.AddForm);
    this.AddForm.patchValue({
      articleId: this.all_arr[item].articleId,
      articleName: this.all_arr[item].articleName,
      content: this.all_arr[item].content,
      previewContent: this.all_arr[item].previewContent,
      categoryId: this.all_arr[item].categoryId,
      categoryName: this.all_arr[item].categoryName,
      createdBy: this.all_arr[item].createdBy,
      createdByName: this.all_arr[item].createdByName,
      createdDate: this.all_arr[item].createdDate,
      modifiedBy: this.all_arr[item].modifiedBy,
      modifiedByName: this.all_arr[item].modifiedByName,
      modifiedDate: this.all_arr[item].modifiedDate
    });
    this.modalService.open(Editpopup, {
      size: "lg"
    });

  }

  UpdateArticles(AddForm) {
    console.log(AddForm);
    this._data.UpdateArticle(AddForm).subscribe(
      (x: any) => {
        alert('updated successfully');
        this.modalService.dismissAll();
        this._data.getAllData().subscribe(
          (data: Articles[]) => {
            this.arr = data;
            console.log(this.arr);
            this.all_arr = this.arr['kbArticles'];

          },
        );
      }
    );
    this.AddForm.reset();
  }


  openReadMore(readmore, item) {

    this.modalService.open(readmore,
      {
        size: "lg"
      });

    this._data.getArticleById(item.articleId).subscribe(
      (x: Articles[]) => {
        this.Readmore = x;
        console.log(this.Readmore);
      }
    )

  }

  readMoreClose() {
    this.modalService.dismissAll();
    this._route.navigate(['/home']);
  }
  // search function
  // onSearch(value) {
  //   console.log(value);
  //   if (value != "") {

  //     this.all_arr = this.all_arr.filter(x => x.articleId.indexOf(value) != -1);

  //   }
  // }

  onSearch(value) {
    if (value != "") {
      this._data.getArticleBySearch(value).subscribe(
        (data: Articles[]) => {

          console.log(data);
          this.arr = data;
          this.all_arr = this.arr['kbArticles'];
          console.log(this.all_arr);
        });
    }
    else {
      this._data.getAllData().subscribe(

        (data: Articles[]) => {
          this.arr = data;
          console.log(this.arr);
          //var arr = _.values(arr);
          this.all_arr = this.arr['kbArticles'];
          console.log(this.all_arr);
          //console.log(this.article[1]);
          // this.article=this.artcle;
          // console.log(this.article[1]);
        });
    }
  }
  getPageInformation() {
    this._data.getAllData().subscribe(
      (data: Articles[]) => {
        this.ngVariable = true;
        this.arr = data;
        this.page = this.arr['pagerInfo'];
        console.log(this.page);
        this.totalItem = this.arr['pagerInfo'].totalItems;

        this.totalPages = this.arr['pagerInfo'].totalPages;
        this.all_articles = this.arr['kbArticles'];
      }
    );
  }
  showPage(number: number) {
    number = this.Page;
    console.log(number);
    if (number != 0) {
      this._data.getPageByNumber(number).subscribe(
        (x: any) => {
          this.arr = x;
          console.log(this.arr);
          this.all_arr = this.arr['kbArticles'];

          console.log(this.all_articles);
        }
      );
    }
  }

}










import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team3Service } from '../team3.service';
import { Articles } from '../article';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-primecomponent',
  templateUrl: './primecomponent.component.html',
  styleUrls: ['./primecomponent.component.css']
})
export class PrimecomponentComponent implements OnInit, OnDestroy {

  display: boolean = false;
  arr: Articles[];

  cols: any[];

  selectedCar: Articles;

  selectArticles: Articles[];
  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  items: MenuItem[];
  id;
  timer: any;
  addform: FormGroup;
  constructor(private _data: Team3Service, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.addform = this.fb.group({
      articleName: new FormControl(null),
      content: new FormControl(null),
      createdBy: new FormControl(null),
      previewContent: new FormControl(null),
      articleId: new FormControl(null),
      categoryName: new FormControl(null),
      createdByName: new FormControl(null),
      createdDate: new FormControl(null),
      modifiedBy: new FormControl(null),
      modifiedByName: new FormControl(null),
      modifiedDate: new FormControl(null),
      categoryId: new FormControl(null),

    });

    //     this.id=  setInterval(()=> {
    // console.log('hi');
    //         this.getAll();
    //       },1000);
    //       setTimeout(()=>
    //       {
    //         clearInterval(this.id);
    //       },30000);
    // clearInterval(this.id);
    // console.log('exit')

    this.getAll();
    this.sortOptions = [
      { label: 'Newest First', value: '!articleName' },
      { label: 'Oldest First', value: 'articleName' },
      { label: 'Category Name', value: 'categoryName' }
    ];
  }


  getAll() {
    this._data.getAllData().subscribe(
      (data: Articles[]) => {
        this.arr = data;
        this.selectArticles = this.arr['kbArticles'];
        console.log(this.selectArticles);
      });

    this.cols = [
      { field: 'articleId', header: 'Article Id' },
      { field: 'articleName', header: 'Article Name' },
      { field: 'content', header: 'Content' },
      { field: 'createdBy', header: 'Created By' },
      { field: 'categoryName', header: 'Category Name' }
      // { field: 'color', header: 'Color' }
    ];

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewCar(this.selectedCar) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteCar(this.selectedCar) },
      { label: 'Edit', icon: 'pi pi-user-edit', command: (event) => this.edit(this.selectedCar) },
      { label: 'add', icon: 'pi pi-user-edit', command: (event) => this.add() }
    ];
  }

  viewCar(car: Articles) {
    this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: car.articleName + ' - ' + car.content });
  }

  deleteCar(car: Articles) {
    console.log(car);
    let index = -1;
    for (let i = 0; i < this.selectArticles.length; i++) {

      if (this.selectArticles[i].articleId == car.articleId) {
        index = i;
        break;
      }
    }
    this.selectArticles.splice(index, 1);
    this.messageService.add({ severity: 'info', summary: 'Car Deleted', detail: car.articleName + ' - ' + car.content });
  }

  add() {
    this.display = true;
  }
  addArticles(item) {
    this._data.addArticles(item).subscribe(
      (data: Articles) => {
        console.log(data);
        this.messageService.add({ severity: 'info', summary: 'Article added', detail: item.articleName + ' - ' + item.content });
        this.display = false;

      }
    )

  }

  edit(car: Articles) {
    this.display = true;
    this.addform.patchValue({
      articleId: car.articleId,
      articleName: car.articleName,
      content: car.content,
      createdBy: car.createdBy,
      categoryName: car.categoryName,
      categoryId: car.categoryId
    });
  }
  UpdateArticles(item) {
    console.log(item);
    this._data.UpdateArticle(item).subscribe(
      (data: Articles[]) => {

        // console.log(data);
        // this.arr=data;
        // console.log(this.arr);
        // this.selectArticles=this.arr['kbArticles'];
        // console.log(this.selectArticles);
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: item.articleName + ' - ' + item.content });
        this.display = false;
        this.getAll();
      }
    );
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  selectCar(event: Event, car: Articles) {
    console.log(car);
    this.selectedCar = car;
    this.displayDialog = true;
    event.preventDefault();
  }
  onDialogHide() {
    this.selectedCar = null;
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
      console.log('exit');
    }
  }
}

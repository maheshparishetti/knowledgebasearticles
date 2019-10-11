import { Component, OnInit } from '@angular/core';
import { Team3Service } from '../team3.service';
import { Articles } from '../article';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-primecomponent',
  templateUrl: './primecomponent.component.html',
  styleUrls: ['./primecomponent.component.css']
})
export class PrimecomponentComponent implements OnInit {

  arr: Articles[];

    cols: any[];

    selectedCar: Articles;

    selectCars:Articles[];

    items: MenuItem[];

    constructor(private _data: Team3Service, private messageService: MessageService) { }

    ngOnInit() {
        this._data.getAllData().subscribe(
          (data:Articles[])=>{
            this.arr=data;
            this.selectCars=this.arr['kbArticles'];
            console.log(this.selectCars);
          } );

        this.cols = [
            { field: 'articleName', header: 'articleName' },
            { field: 'content', header: 'content' },
            { field: 'createdBy', header: 'createdBy' }
            // { field: 'color', header: 'Color' }
        ];

        this.items = [
            { label: 'View', icon: 'pi pi-search', command: (event) => this.viewCar(this.selectedCar) },
            { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteCar(this.selectedCar) }
        ];
    }

    viewCar(car: Articles) {
        this.messageService.add({ severity: 'info', summary: 'Car Selected', detail: car.articleName + ' - ' + car.content });
    }

    deleteCar(car: Articles) {
      console.log(car);
        let index = -1;
        for (let i = 0; i < this.selectCars.length; i++) {

            if (this.selectCars[i].articleId == car.articleId) {
                index = i;
                break;
            }
        }
        this.selectCars.splice(index, 1);
        this.messageService.add({ severity: 'info', summary: 'Car Deleted', detail: car.articleName + ' - ' + car.content });
    }

}

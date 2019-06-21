import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {forkJoin} from 'rxjs';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, private data: DataService) {
  }

  ngOnInit() {
    this.loadData();
  }
  // Первоначальная загрузка данных
  loadData(): void {
    const dataJoin = forkJoin([this.api.getGoods(), this.api.getCategory()]);
    dataJoin.subscribe(
      data => {
        const goods = data[0].map((elem) => {
          elem.groupName = data[1].find((category) => {
            return category.id === elem.groupId;
          }).name;
          return elem;
        });
        this.data.goods.next(goods);
        this.data.categories =  data[1];
        this.data.getNumberOfView();
        this.router.navigate(['dashboard']);
      }, error1 => {
        console.log(error1);
      }
    );
  }
}

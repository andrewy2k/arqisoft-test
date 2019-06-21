import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {IGood} from '../../../models/models';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.less']
})
export class ListItemsComponent implements OnInit {

  viewListStatus: boolean;
  searchQuery = new FormControl();

  constructor(public data: DataService, private router: Router) {
  }

  ngOnInit() {
    // Устанавливаем значение строки поиска и потом подписываемся на обновления через пол секунды после прекращения набора фильтруем список товаров
    this.searchQuery.setValue(this.data.query);
    this.searchQuery.valueChanges.pipe(
      debounceTime(500),
    )
      .subscribe(query => {
        if (query !== undefined && query.length >= 2) {
          this.data.goodFilter(query);
        } else if (query.length === 0) {
          this.data.goodFilter(query);
        }
      });
  }

  // Вставка нового товара в общий список
  insertGood(): void {
    const goods = this.data.goods.getValue();
    const id: number = goods[goods.length - 1].id + 1;
    const newElem: IGood = {
      id: id,
      name: null,
      groupId: null,
      groupName: null,
      img: null,
      description: null,
      price: null,
      numbersOfViews: 0,
    };
    goods.push(newElem);
    this.data.goods.next(goods);
    this.router.navigate([this.router.url, id]);
  }
}

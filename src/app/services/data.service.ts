// Сервис обмена данными между компонентами

import {Injectable} from '@angular/core';
import {IGood, IGoodsCategory} from '../models/models';
import {BehaviorSubject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  categories: IGoodsCategory[];
  goods: BehaviorSubject<IGood[]> = new BehaviorSubject<IGood[]>([]);
  filteredGoods: IGood[];
  numberOfView: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  query: string;
  goodsSubscribe$: Subscription;

  constructor() {
    this.goodsSubscribe$ = this.goods.subscribe(
      goods => {
        if (goods.length > 0) {
          this.goodFilter(this.query);
        }
      }
    );
  }

  // Расчет количества просмотров товаров в отфильтрованном списке
  getNumberOfView(): void {
    this.numberOfView.next(this.filteredGoods.reduce((summ, elem) => {
      return summ + elem.numbersOfViews;
    }, 0));
  }

  // Удаление товара из полного списка
  deleteGood(index: number): void {
    const goods = [...this.goods.getValue()];
    goods.splice(index, 1);
    this.goods.next(goods);
  }

  // Фильтрация списка товаров
  goodFilter(query: string): void {
    this.query = query;
    if (query === undefined || query.length === 0) {
      this.filteredGoods = [...this.goods.getValue()];
      this.getNumberOfView();
      return;
    }
    this.filteredGoods = [...this.goods.getValue().filter((elem) => {
      if (elem.name !== null) {
        return elem.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1;
      }
    })];
    this.getNumberOfView();
  }
}

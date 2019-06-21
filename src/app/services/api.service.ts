import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGood, IGoodsCategory} from '../models/models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // Получаем категори
  getCategory(): Observable<IGoodsCategory[] | any> {
    return this.http.get('./assets/data/category.json');
  }

  // Получаем товары
  getGoods(categoryId?: number): Observable<IGood[] | any> {
    if (categoryId !== undefined) {
      return this.http.get('./assets/data/goods.json').pipe(
        map(data => {
          let goods = data as IGood[];
          goods = goods.filter(elem => elem.groupId === categoryId);
          return this.addDescription(goods);
        })
      );
    }
    return this.http.get('./assets/data/goods.json').pipe(
      map(data => {
        return this.addDescription(data);
      })
    );
  }

  // Добавляем описание к товарам
  addDescription(goods: IGood[] | any): IGood[] {
    goods.map((elem: IGood) => {
      return elem.description = 'Описание товара: ' + elem.name;
    });
    return goods;
  }

  constructor(private http: HttpClient) {
  }
}

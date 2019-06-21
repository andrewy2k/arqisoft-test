import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IGood} from '../../../models/models';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit {

  @Input() viewListStatus: boolean;
  @Input() items: IGood[];

  constructor(private data: DataService, private router: Router) {
  }

  ngOnInit() {
  }

  // Функция выдачи уникального ID
  trackByFn(index, item): number {
    return item.id;
  }

  // Создание URL для получения картинки
  makeUrl(img: string): string {
    return './assets/images/' + img;
  }

  // Открываем товар для просмотра и редактирования и добавляем к нему просмотр
  openGood(index: number): void {
    this.items[index].numbersOfViews++;
    this.data.getNumberOfView();
    this.router.navigate([this.router.url, this.items[index].id]);
  }

  // Удаляем товар
  delete(index: number, event): void {
    event.stopPropagation();
    this.data.deleteGood(index);
  }

}

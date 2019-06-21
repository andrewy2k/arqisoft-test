import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {

  numberOfGoods: number;
  numberOfViewSubject$ = this.data.numberOfView.asObservable();
  numberOfViewSubscribe: Subscription;

  constructor(public data: DataService) {
  }

  // Подписываемся на обновление кол-ва просмотров
  ngOnInit() {
    this.numberOfViewSubscribe = this.numberOfViewSubject$.subscribe(
      value => {
        this.numberOfGoods = value;
      }
    );
  }

  ngOnDestroy() {
    this.numberOfViewSubscribe.unsubscribe();
  }

}

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IGood, IGoodsCategory} from '../../../models/models';
import {Subscription} from 'rxjs';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit, OnDestroy {

  good: IGood;
  categories: IGoodsCategory[];
  goodLoadStatus: boolean;
  paramsSubscribe$: Subscription;
  goodsSubscribe$: Subscription;
  goodForm: FormGroup;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder
  ) {
    this.categories = this.data.categories;
    // Подписываемся на ID товара из параметров и на список товаров
    this.paramsSubscribe$ = route.params.subscribe(
      params => {
        this.goodsSubscribe$ = this.data.goods.subscribe(
          goods => {
            this.good = goods.find(elem => elem.id === +params.id);
            if (this.good === undefined) {
              this.router.navigate(['items']);
            }
            this.goodLoadStatus = true;
            this.goodFormInit(this.good);
          },
          error1 => {
            console.log(error1);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.paramsSubscribe$.unsubscribe();
    this.goodsSubscribe$.unsubscribe();
  }

  // Инициализируем форму товара
  goodFormInit(good: IGood): void {
    this.goodForm = this.formBuilder.group({
      name: [good.name,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZА-ЯЁа-яё0-9_\s]+$/i),
          Validators.minLength(3)
        ]
      ],
      groupName: [good.groupName,
        [
          Validators.required,
        ]],
      file: [good.img],
      description: [good.description],
      price: [good.price,
        [
          Validators.pattern(/\d\.\d+/g),
        ]
      ],
    });
  }

  // Меняем фото в открытом товараре
  fileChange(files: any[]): void {
    if (files && files[0]) {
      const photo = files;
      this.good.img = photo[0].name;
    }
  }

  // При клике по картинке вызываем событие на Input и выбираем файл
  selectPhoto(): void {
    this.fileInput.nativeElement.click();
  }

  // Создаем URL для кртинки
  makeUrl(img: string): string {
    return './assets/images/' + img;
  }

  // Закрываем форму
  close(): void {
    this.data.getNumberOfView();
    this.router.navigate(['items']);
  }

  // Обновляем данные формы и закрываем форму
  save(event): void {
    const goods = this.data.goods.getValue();
    const ind = goods.findIndex((elem) => elem.id === this.good.id);
    const controls = this.goodForm.controls;

    event.preventDefault();
    this.good = Object.assign({}, this.good);

    if (!this.goodForm.valid) {
      Object.keys(controls).forEach(key => {
        controls[key].markAsTouched();
      });
      return;
    }

    this.good.name = String(this.goodForm.get('name').value);
    this.good.groupName = String(this.goodForm.get('groupName').value);
    this.good.groupId = this.data.categories.find(elem => elem.name === this.good.groupName).id;
    this.good.description = String(this.goodForm.get('description').value);
    this.good.price = +this.goodForm.get('price').value;
    this.good.numbersOfViews++;

    goods[ind] = Object.assign({}, this.good);
    this.data.goods.next(goods);

    this.close();
  }

  // Удаляем товар и закрываем форму
  delete(): void {
    this.data.deleteGood(this.data.goods.getValue().findIndex(elem => elem.id === this.good.id));
    this.close();
  }


}

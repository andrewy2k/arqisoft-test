import {NgModule} from '@angular/core';
import {ListItemsComponent} from './list-items/list-items.component';
import {ItemComponent} from './item/item.component';
import {ItemsComponent} from './items/items.component';
import {routing} from './list-items.routing';
import {CommonModule} from '@angular/common';
import {ReplaceErrorImageDirective} from '../../directives/replace-error-image.directive';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListItemsComponent, ItemComponent, ItemsComponent, ReplaceErrorImageDirective],
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule
  ]
})
export class ListItemsModule {
}

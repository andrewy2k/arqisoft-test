import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListItemsComponent} from './list-items/list-items.component';
import {ItemComponent} from './item/item.component';

const routes: Routes = [
  {
    path: '',
    component: ListItemsComponent,
  },
  {
    path: ':id',
    component: ItemComponent,
    pathMatch: 'full'
  },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);

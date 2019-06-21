import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'main',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./modules/list-items/list-items.module').then(m => m.ListItemsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

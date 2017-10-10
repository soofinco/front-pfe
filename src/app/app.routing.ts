import { CanActivateAuthGuardService } from './can-activate-auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullLayout,SimpleLayout} from './containers';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const routes: Routes = [
  {path: '',redirectTo: 'pages/login',pathMatch: 'full'},
  /*###########################-- / -- ##############################*/
  {path: '',component: FullLayout,canActivate:[CanActivateAuthGuardService],data: {title: 'Accueil'},
    children: [
      {path: 'dashboard',loadChildren: './views/dashboard/dashboard.module#DashboardModule',},
      {path: 'components',loadChildren: './views/components/components.module#ComponentsModule'},
      {path: 'icons',loadChildren: './views/icons/icons.module#IconsModule'},
      {path: 'widgets',loadChildren: './views/widgets/widgets.module#WidgetsModule'},
      {path: 'charts',loadChildren: './views/chartjs/chartjs.module#ChartJSModule'}
    ]
  },
  
  /*###########################-- Pages -- ##############################*/
  {path: 'pages',component: SimpleLayout,data: {title: 'Pages'},
    children: [
      {path: '',loadChildren: './views/pages/pages.module#PagesModule',}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@project/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(page => page.PagesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login',
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

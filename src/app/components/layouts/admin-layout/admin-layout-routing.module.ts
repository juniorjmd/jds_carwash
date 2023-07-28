import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from 'src/app/guards/auth-guards';



const routes: Routes = [

  // { path: '', component: WelcomeComponent },
  {
    path: 'home', loadChildren: () => import('src/app/components/home/home.component').then(m => m.HomeComponent)
  },

  { path: '**', pathMatch: 'full', redirectTo: 'home' },

  // {
  //   path: 'reservas', component: HorariosComponent, data: {
  //     breadcrumb: 'Administrador de Reservas'
  //   }
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }

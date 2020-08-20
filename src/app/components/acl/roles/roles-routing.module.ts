import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'edit/:id',
        component: EditComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}

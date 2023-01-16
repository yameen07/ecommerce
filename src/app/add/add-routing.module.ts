import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { EditComponent } from './edit/edit.component';
import { DataComponent } from './data/data.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: 'AdminOrders',
    component: AdminOrdersComponent,
  },

  {
    path: 'Data',
    component: DataComponent,
  },

  {
    path: 'Edit',
    component: EditComponent,
  },

  {
    path: 'SubCategory',
    component: SubCategoryComponent,
  },

  {
    path: 'Category',
    component: CategoryComponent,
  },

  {
    path: 'Users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRoutingModule {}

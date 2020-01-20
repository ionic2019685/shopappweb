import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CategoryRoutes } from './category.routing';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AddCategoryComponent } from './add-category/add-category.component';
@NgModule({
  declarations: [CategoryComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
     RouterModule.forChild(CategoryRoutes),
    SharedModule
  ]
})
export class CategoryModule { }

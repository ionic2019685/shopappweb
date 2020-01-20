import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

export const CategoryRoutes: Routes = [
	{
		path: 'category',
		children: [
			{
				path: '',
				component: CategoryListComponent
			},
			{
				path: ':id',
				component: CategoryDetailComponent
			}
		]
	}
];

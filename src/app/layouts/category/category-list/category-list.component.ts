import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/models/product';
import { AuthService } from '../../../shared/services/auth.service';
import { CategoryService } from '../../../shared/services/category.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[];
	loading = false;
	brands = ['All', 'Google', 'Apple', 'Realme', 'Nokia', 'Motorolla'];

	selectedBrand: 'All';

  page = 1;
	constructor(
		public authService: AuthService,
		private categoryService: CategoryService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.getAllCategorys();
	}

	getAllCategorys() {
		// this.spinnerService.show();
		this.loading = true;
		const x = this.categoryService.getCategorys();
		x.snapshotChanges().subscribe(
			(product) => {
				this.loading = false;
				// this.spinnerService.hide();
				this.categoryList = [];
				product.forEach((element) => {
					const y = element.payload.toJSON();
					y['$key'] = element.key;
					this.categoryList.push(y as Category);
				});
			},
			(err) => {
				this.toastrService.error('Error while fetching Category', err);
			}
		);
	}

	removeCategory(key: string) {
		this.categoryService.deleteCategory(key);
	}

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { AuthService } from '../../../shared/services/auth.service';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { Category } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/services/category.service';
@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	productList: Product[];
	categoryList: Category[];
	loading = false;
	brands = ['All', 'Google', 'Apple', 'Realme', 'Nokia', 'Motorolla'];

	selectedBrand: 'All';

	page = 1;
	constructor(
		public authService: AuthService,
		private productService: ProductService,
		private categoryService: CategoryService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.getAllProducts();
	}

	getAllProducts() {
		// this.spinnerService.show();
		this.loading = true;
		const x = this.productService.getProducts();
		x.snapshotChanges().subscribe(
			(product) => {
				this.loading = false;
				// this.spinnerService.hide();
				this.productList = [];
				product.forEach((element) => {
					const y = element.payload.toJSON();
					y['$key'] = element.key;
					this.productList.push(y as Product);
				});
			},
			(err) => {
				this.toastrService.error('Error while fetching Products', err);
			}
		);
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
	removeProduct(key: string) {
		this.productService.deleteProduct(key);
	}

	addFavourite(product: Product) {
		this.productService.addFavouriteProduct(product);
	}

	addToCart(product: Product) {
		this.productService.addToCart(product);
	}
}

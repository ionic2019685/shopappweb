import { Product, Category } from '../../../shared/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthService } from 'src/app/shared/services/auth.service';

// tslint:disable
@Component({
	selector : 'app-product-detail',
	templateUrl : './product-detail.component.html',
	
	styleUrls: [ './product-detail.component.scss' ]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	private sub: any;
	product: Product;
	isUpdate : boolean = false;
	categoryList: Category[];
	category : Category;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private toastrService: ToastrService,
		private categoryService: CategoryService,
		public authService: AuthService
	) {
		this.product = new Product();
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params) => {
			const id = params['id']; // (+) converts string 'id' to a number
			this.getProductDetail(id);
		});
		this.getAllCategorys();
	}

	getProductDetail(id: string) {
		// this.spinnerService.show();
		const x = this.productService.getProductById(id);
		x.snapshotChanges().subscribe(
			(product) => {
				// this.spinnerService.hide();
				const y = product.payload.toJSON() as Product;

				y['$key'] = id;
				this.product = y;

				// get category of the product
				const x = this.categoryService.getCategoryById(this.product.productCategory);
		x.snapshotChanges().subscribe(
			(cat) => {
				// this.spinnerService.hide();
				const c = cat.payload.toJSON() as Category;

				c['$key'] = this.product.productCategory;
				this.category = c;
			},
			(error) => {
				this.toastrService.error('Error while fetching Product Detail', error);
			}
		);
			},
			(error) => {
				this.toastrService.error('Error while fetching Product Detail', error);
			}
		);
	}
	getAllCategorys() {
		const x = this.categoryService.getCategorys();
		x.snapshotChanges().subscribe(
			(product) => {
				// this.spinnerService.hide();
				this.categoryList = [];
				product.forEach((element) => {
					const y = element.payload.toJSON();
					y['$key'] = element.key;
					this.categoryList.push(y as Category);
				});
			},
			(err) => {
			}
		);
	}

	addToCart(product: Product) {
		this.productService.addToCart(product);
	}

	updateProduct(product: Product) {
		this.productService.updateProduct(product).then(resp=>{
			this.isUpdate = !this.isUpdate;
		}).catch(err=>{
			this.toastrService.error('Une erreur est survenue', err);
			this.isUpdate = !this.isUpdate;
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}

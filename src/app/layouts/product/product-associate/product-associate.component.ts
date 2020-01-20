import { TranslateService } from 'src/app/shared/services/translate.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product, Category } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
  selector: 'app-product-associate',
  templateUrl: './product-associate.component.html',
  styleUrls: ['./product-associate.component.scss']
})
export class ProductAssociateComponent implements OnInit {

  bestProducts: Product[] = [];
  options: any;
  @Input() categoryId: String;
  loading = false;
  constructor(
    private productService: ProductService,
    private toasterService: ToastrService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        '0': { items: 1, margin: 5 },
        '430': { items: 2, margin: 5 },
        '550': { items: 3, margin: 5 },
        '670': { items: 4, margin: 5 }
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 3000,
      lazyLoad: true
    };
    if (this.categoryId) {
      this.getAllProducts();
    }

  }

  getAllProducts() {
    this.loading = true;
    const x = this.productService.getProductByCategory(this.categoryId);
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.bestProducts = [];
        for (let i = 0; i < 5; i++) {
          const y = product[i].payload.toJSON();
          y['$key'] = product[i].key;
          this.bestProducts.push(y as Product);
        }
      },
      (error) => {
        this.loading = false;
        this.toasterService.error('Error while fetching Products', error);
      }
    );
  }

}

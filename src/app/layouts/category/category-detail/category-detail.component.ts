import { Category } from '../../../shared/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthService } from 'src/app/shared/services/auth.service';
// tslint:disable
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  private sub: any;
  category: Category;
  isUpdate : boolean = false;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    public authService: AuthService
  ) {
    this.category = new Category();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    // this.spinnerService.show();
    const x = this.categoryService.getCategoryById(id);
    x.snapshotChanges().subscribe(
      (cate) => {
        // this.spinnerService.hide();
        const y = cate.payload.toJSON() as Category;

        y['$key'] = id;
        this.category = y;
      },
      (error) => {
        this.toastrService.error('Error while fetching Product Detail', error);
      }
    );
  }

  editCategory(cat) {
    if(this.authService.isLoggedIn && this.authService.isAdmin){
      this.categoryService.updateCategory(cat);
      this.isUpdate = !this.isUpdate;
    }
    
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

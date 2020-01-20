import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/product';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();
	fileIsUploading = false;
fileUrl: string;
fileUploaded = false;
	constructor(private categoryService: CategoryService) {}

	ngOnInit() {}

	createCategory(productForm: NgForm) {
		productForm.value['id'] = 'CAT' + shortId.generate();
		if (productForm.value['imageUrl'] === undefined) {
      
			productForm.value['imageUrl'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
		}
if (this.fileUrl !== undefined && this.fileUrl !== "") {
	
}

		this.categoryService.createCategory(productForm.value);

		this.category = new Category();

		$('#exampleModalLong').modal('hide');

		toastr.success('Category ' + productForm.value['name'] + 'is added successfully', 'Category Creation');
	}
	
	detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
}

onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.categoryService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
}

}

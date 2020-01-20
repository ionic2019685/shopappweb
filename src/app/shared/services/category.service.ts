import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product, Category } from '../models/product';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';
@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	categorys: AngularFireList<Category>;
	category: AngularFireObject<Category>;
	constructor(
		private db: AngularFireDatabase,
		private authService: AuthService,
		private toastrService: ToastrService,
		private storage: AngularFireStorage
	) { }

	getCategorys() {
		this.categorys = this.db.list('category');
		return this.categorys;
	}

	createCategory(data: Category) {
		this.categorys.push(data);
	}

	getCategoryById(key: string) {
		this.category = this.db.object('category/' + key);
		return this.category;
	}

	updateCategory(data: Category) {
		console.log(data);
		const key = data.$key;
		delete data.$key;
		this.db.object('category/' + key).update(data);
	}

	deleteCategory(key: string) {
		this.categorys.remove(key);
	}

	uploadFile(file: File) {
		return new Promise(
			(resolve, reject) => {

				const almostUniqueFileName = Date.now().toString();
				const filePath = 'images/category' + almostUniqueFileName + file.name;
				const fileRef = this.storage.ref(filePath);
				const task = this.storage.upload(filePath, file);

				// observe percentage changes
				const uploadPercent = task.percentageChanges();
				// get notified when the download URL is available
				task.snapshotChanges()
					.subscribe((res) => {
						let downloadURL = fileRef.getDownloadURL();
						resolve(downloadURL);
					}
					);
			}
		);
	}
}

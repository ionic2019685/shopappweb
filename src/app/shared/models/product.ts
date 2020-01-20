export class Product {
  $key: string;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productAdded: number;
  productQuatity: number;
  ratings: number;
  favourite: boolean;
  productSeller: string;
}

export class Category {
  $key: string;
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  pictures: Array<string> = [];
}
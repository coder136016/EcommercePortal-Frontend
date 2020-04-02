import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../services/services/cart.service';
import { CartItem } from './../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  previousCategoryId: number;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(() => { this.listProducts(); });

  }
  listProducts() {
    const searchProduct: boolean = this.route.snapshot.paramMap.has('keyword');

    if (searchProduct) {
      this.handleSerchproduct();
    } else {
      this.handleListProduct();
    }

  }


  handleSerchproduct() {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(keyword)
      .subscribe(data => {
        console.log(data);
        this.products = data;

      });

  }

  handleListProduct() {
    const categoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (categoryId) {
      console.log();
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      console.log(this.currentCategoryId);
      
    } else {this.currentCategoryId=1;}

          //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());

    
  }
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(tempProduct : Product)
  {
        console.log(tempProduct.unitPrice);
        const cart =new CartItem(tempProduct);
        this.cartService.addToCart(cart);
  }

}

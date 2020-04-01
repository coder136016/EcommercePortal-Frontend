import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../../services/product.service';
import { ProductCategory } from 'src/app/common/product-category';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories:ProductCategory[];
  constructor(private productService: ProductService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

  listProductCategories()
  {
      this.productService.getProductCategories()
      .subscribe(data=>{
        console.log(data);
                this.productCategories=data;
                console.log(this.productCategories);

      });

  }

}

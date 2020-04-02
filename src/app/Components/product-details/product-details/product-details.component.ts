import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product=new Product();
  productId: number;
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => { this.showProductDetails(); });
  }
  showProductDetails()
  {
    this.productId = +this.route.snapshot.paramMap.get('id');

    this.productService.getProductById(this.productId)
    .subscribe(data=>{
      console.log(data);
      this.product=data;
    });
  }
}

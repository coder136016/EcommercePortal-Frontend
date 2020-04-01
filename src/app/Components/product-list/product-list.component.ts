import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

products:Product[];
currentCategoryId:number;
  constructor(private productService: ProductService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(()=>{this.listProducts();});

  }
  listProducts(){
    const categoryId:boolean=this.route.snapshot.paramMap.has('id');
    
    if (categoryId) {
      console.log();
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
      console.log(this.currentCategoryId);
      this.productService.getProductList(this.currentCategoryId).subscribe(data=>{
        console.log(data);

        this.products=data;
      })
    } else {
     this.productService.getProductList(1)
    .subscribe(
      data=>{
        console.table(data);
        this.products=data;}

    )
      }
    
   
  }

}

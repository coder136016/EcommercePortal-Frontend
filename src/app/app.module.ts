import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import{Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './Components/product-category-menu/product-category-menu/product-category-menu.component';
import { SearchProductComponent } from './Components/search-product/search-product/search-product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details/product-details.component';
import { CartStatusComponent } from './Components/cart-status/cart-status.component'
const routes: Routes=[

  {path: 'category/:id', component: ProductListComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},

  {path: 'category/:id', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}

];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchProductComponent,
    ProductDetailsComponent,
    CartStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

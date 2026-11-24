import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Product } from '../../services/product';
import { ProductItem } from '../product-item/product-item';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [ProductItem,RouterLink,FormsModule],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private readonly productsservice = inject(Product);
 
products = this.productsservice.products;
category=signal('');
maxPrice=signal<number|null>(null);
filteredProducts = computed(() => {
  const categoryValue=this.category().trim().toLowerCase();
  const priceValue=this.maxPrice();
  return this.products().filter(p =>
    p.categorie.toLowerCase().includes(categoryValue) &&
    (priceValue === null || p.prix <= priceValue)&& p.deleted===false
  );
});
  ngOnInit(): void {
    this.productsservice.getproduit().subscribe();
  }
  updateMaxPrice(value: string): void {
  this.maxPrice.set(value === '' ? null : Number(value));
}
}
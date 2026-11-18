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
  // Critère 1 : nom
  searchName = signal('');
  // Critère 2 : prix maximum
  maxPrice=signal<number | null>(null);
  // Recherche avec les deux critères
  filteredProducts = computed(() => {
    return this.products().filter(p => {
      const nameMatch =
        p.nom.toLowerCase().startsWith(
          this.searchName().toLowerCase().trim()
        );
      const priceMatch =
        this.maxPrice() === null ||
        p.prix < this.maxPrice()!;

      return nameMatch && priceMatch;
    });

  });

  ngOnInit(): void {
    this.productsservice.getproduit().subscribe();
   
  }
  updateMaxPrice(value: string): void {
  this.maxPrice.set(value === '' ? null : Number(value));
}


}
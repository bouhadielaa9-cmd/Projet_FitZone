import { Component, inject, OnInit, computed } from '@angular/core';
import { Product } from '../../services/product';
import { ProductItem } from '../product-item/product-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [ProductItem, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {

  private productService = inject(Product);

  products = this.productService.products;

  produitsFavoris = computed(() =>
    this.products().filter(p =>
      p.favori === true && p.deleted !== true
    )
  );
  ngOnInit(): void {
    this.productService.getproduit().subscribe();
  }
}
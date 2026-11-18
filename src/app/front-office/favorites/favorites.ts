import { Component, inject, OnInit, computed } from '@angular/core';
import { Product } from '../../services/product';
import { Favoris } from '../../services/favoris';
import { ProductItem } from '../product-item/product-item';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-favorites',
  imports: [ProductItem,RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {

  private productService = inject(Product);
  private favorisService = inject(Favoris);
  products = this.productService.products;
  favoris = this.favorisService.favoris;
  produitsFavoris=computed(() =>
    this.products().filter(p => this.favoris().includes(p.id))
  );
  ngOnInit(): void {
    this.productService.getproduit().subscribe();
  }
}
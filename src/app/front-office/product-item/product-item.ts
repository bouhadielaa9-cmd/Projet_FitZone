import { Component, inject, input } from '@angular/core';
import { Produit } from '../../models/produit';
import { RouterLink } from '@angular/router';
import { Favoris } from '../../services/favoris';
@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  product = input.required<Produit>();
  private favorisService = inject(Favoris);

  toggleFavori(): void {
    this.favorisService.toggleFavori(this.product().id);
  }

  isFavori(): boolean {
    return this.favorisService.isFavori(this.product().id);
  }
}
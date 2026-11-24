import { Component, inject, input } from '@angular/core';
import { Produit } from '../../models/produit';
import { RouterLink } from '@angular/router';
import { PrixPipe } from '../../pipes/prix-pipe';
import { Product } from '../../services/product';
@Component({
  selector: 'app-product-item',
  imports: [RouterLink,PrixPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  product = input.required<Produit>();
private productService = inject(Product);

changerFavori() {
  this.productService.changerFavori(this.product()).subscribe();
}
}
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { Produit } from '../../models/produit';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  imports: [RouterLink,JsonPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly productservice = inject(Product);

  product = signal<Produit | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productservice.getproduitbyid(id).subscribe({
        next: (p) => {
          this.product.set(p);
          console.log(this.product());
        },
        error: (err) => console.log(err)
      });
    }
  }
}
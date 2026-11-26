
import { Component, computed, inject, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { Produit } from '../../models/produit';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trash',
  imports: [RouterLink],
  templateUrl: './trash.html',
  styleUrl: './trash.css'
})
export class Trash implements OnInit {

  productservice = inject(Product);

  ngOnInit(): void {
    this.productservice.getproduit().subscribe();
  }
  produitsSupprimes = computed(() => {
    return this.productservice.products().filter(p => p.deleted === true);
  });

  restaurer(p: Produit) {
    this.productservice.restaurerproduit(p).subscribe(() => {
      this.productservice.getproduit().subscribe();
    });
  }
  supprimerDefinitivement(p: Produit) {
    this.productservice.supprimerDefinitivement(p.id).subscribe()
  }
}

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../services/product';
import { Produit } from '../../models/produit';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Categorie } from '../../models/categorie';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink,FormField, FormRoot, FormsModule],
  selector: 'app-product-management',
  styleUrl: './product-management.css',
  templateUrl: './product-management.html',
})
export class ProductManagement implements OnInit {
   productservice=inject(Product);
    categorie=Object.values(Categorie);
  ngOnInit(): void {
   this.productservice.getproduit().subscribe();
  }
onsuprrime(p: Produit) {
  this.productservice.supprimeproduit(p).subscribe(() => {
    this.productservice.getproduit().subscribe();
  });
}
   readonly produitModel=signal<Produit>({
  id:"",
  nom:"",
  photo:"",
  prix: 0,
  enStock: true,
  deleted:false,
  favori:false,
  dateAjout: "",
  categorie: "",
  description: "",
  commentaires: [],
  tailles: [],
  couleurs: [],
  poids: 0,
  })
readonly produitForm = form(this.produitModel, path => {
  required(path.nom, { message: 'Product name is required' });
  required(path.photo, { message: 'Product photo is required' });
  required(path.prix, { message: 'Product price is required' });
  required(path.dateAjout, { message: 'Date is required' });
  required(path.categorie, { message: 'Category is required' });
  required(path.description, { message: 'Description is required' });
});
mode=signal<boolean>(false);
 modifierproduit(p: Produit) {
  this.produitModel.set({...p});
  this.mode.set(true);
}
onSubmit() {
  this.productservice.modifierproduit(this.produitModel()).subscribe({
    next: () => {
      this.mode.set(false);
      this.productservice.getproduit().subscribe();
    }
  });
}
searchname=signal("");
filtrerproduit = computed(() => {
  const searchnamevalue = this.searchname().toLowerCase();

  return this.productservice.products().filter(p => {
    return p.deleted === false &&
           p.nom.toLowerCase().includes(searchnamevalue);
  });
});
}

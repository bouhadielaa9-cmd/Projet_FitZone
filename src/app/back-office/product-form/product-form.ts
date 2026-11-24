import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../services/product';
import { Produit } from '../../models/produit';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Categorie } from '../../models/categorie';
import { RouterLink } from '@angular/router';
@Component({
  imports: [FormField,FormRoot,RouterLink],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
     productservice=inject(Product);
  ngOnInit(): void {
   this.productservice.getproduit().subscribe();
  }
  onsuprrime(p:Produit){
    this.productservice.supprimeproduit(p).subscribe();
  }
  onajout(p:Produit){
    this.productservice.ajouterproduit(p).subscribe();
  }
  readonly produitModel=signal<Produit>({
  id:"",
  nom:"",
  photo:"",
  prix: 0,
  enStock: true,
  deleted:false,
  favori: false,
  dateAjout: "",
  categorie: "",
  description: "",
  commentaires: [],
  tailles: [],
  couleurs: [],
  poids: 0,
  })
  readonly produitForm=form(this.produitModel);
  categorie=Object.values(Categorie);
  onSubmit(){
    console.log(this.produitModel())
    this.productservice.ajouterproduit(this.produitModel()).subscribe();
    this.resetForm();
  }
  resetForm(){
    this.produitModel.set({
       id:"",
  nom:"",
  photo:"",
  prix: 0,
  enStock: true,
  deleted:false,
  favori:false,
  dateAjout: "",
  categorie: "gym wear",
  description: "",
  commentaires: [],
  tailles: [],
  couleurs: [],
  poids: 0,
    })
  }
  addsizes(){
    this.produitModel.update(produit=>({
      ...produit,
      tailles: [...produit.tailles??[], '']
    }));
  }
}

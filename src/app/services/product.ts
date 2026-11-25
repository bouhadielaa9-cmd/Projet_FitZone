import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service, signal } from '@angular/core';
import { Produit } from '../models/produit';
import { Observable ,tap} from 'rxjs';
import { environment } from '..//../environments/environment';
const URL = `${environment.apiUrl}/products`;
@Service()
export class Product {
    private readonly _http=inject(HttpClient);
    private readonly _products=signal<Produit[]>([]);
    products=this._products.asReadonly();
  getproduit():Observable<Produit[]>{
     return this._http.get<Produit[]>(URL)
     .pipe(
        tap(allproducts=>this._products.set(allproducts))
     );
    }
   getproduitbyid(id: string): Observable<Produit> {
  return this._http.get<Produit>(`${URL}/${id}`);
   
}

supprimeproduit(p: Produit) {
  return this._http.put(
    `${URL}/${p.id}`,
    { ...p, deleted: true }
  );
}
   ajouterproduit(p:Produit){
    return this._http.post<Produit>(URL,p).pipe(
      tap(productadedd=>
        this._products.update(pr=>[...pr,productadedd])
      )
    )
   }
   modifierproduit(nouveauproduit:Produit):Observable<Produit>{
    return this._http.put<Produit>(`${URL}/${nouveauproduit.id}`,nouveauproduit).pipe(
      tap(
        updateproduct=>
          this._products.update(allproduct=>
            allproduct.map(p=>(p.id==nouveauproduit.id)?updateproduct:p)
          )
      )
    )
   }
restaurerproduit(p: Produit) {
  return this._http.put(
    `${URL}/${p.id}`,
    { ...p, deleted: false }
  );
}
supprimerDefinitivement(id: string) {
  return this._http.delete(`${URL}/${id}`);
}
changerFavori(p: Produit) {
  return this._http.put<Produit>(
    `${URL}/${p.id}`,
    { ...p, favori: !p.favori }
  ).pipe(
    tap(produitModifie => {
      this._products.update(liste =>
        liste.map(prod =>
          prod.id === produitModifie.id ? produitModifie : prod
        )
      );
    })
  );
}
}

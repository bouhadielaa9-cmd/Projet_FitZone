import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service, signal } from '@angular/core';
import { Produit } from '../models/produit';
import { Observable ,tap} from 'rxjs';
const URL="http://localhost:3000/products"
@Injectable({
  providedIn: 'root'
})
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
}

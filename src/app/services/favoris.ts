import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Favoris {
  private _favoris = signal<string[]>(
    JSON.parse(localStorage.getItem('favoris') || '[]')
  );
  favoris = this._favoris.asReadonly();
  toggleFavori(id: string): void {
    const liste=this._favoris();
    if (liste.includes(id)) {
      // Le produit existe déjà : on le retire
      this._favoris.set(liste.filter(p => p !== id));
    } else {
      // Le produit n'existe pas : on l'ajoute
      this._favoris.set([...liste, id]);
    }
    // Sauvegarder dans localStorage
    localStorage.setItem('favoris', JSON.stringify(this._favoris()));
  }
  isFavori(id: string): boolean {
    return this._favoris().includes(id);
  }
}
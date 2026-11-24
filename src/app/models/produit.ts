import { Commentaire } from "./commentaire";
export interface Produit {
  id: string;
  nom: string;
  photo: string;
  prix: number;
  enStock: boolean;
  deleted: boolean;
  favori: boolean;
  dateAjout: string;
  categorie: string;
  description: string;
  commentaires: Commentaire[];
  tailles?: string[];
  couleurs?: string[];
  poids?: number;
}
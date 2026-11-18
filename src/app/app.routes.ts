import { Routes } from '@angular/router';
import { ProductList } from './front-office/product-list/product-list';
import { Home } from './front-office/home/home';
import { ProductDetail } from './front-office/product-detail/product-detail';
import { About } from './front-office/about/about';
import { Favorites } from './front-office/favorites/favorites';

export const routes: Routes = [
    {path:"home",title:"accueil",component:Home},
    { path:"products",title:"products",component:ProductList},
{path:"products/:id", title:"Product Details", component:ProductDetail},
    { path: 'about', title: 'About', component:About },
   { path: 'favorites', title: 'My Favorites', component: Favorites },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];

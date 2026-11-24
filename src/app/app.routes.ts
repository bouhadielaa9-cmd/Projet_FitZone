import { Routes } from '@angular/router';
import { ProductList } from './front-office/product-list/product-list';
import { Home } from './front-office/home/home';
import { ProductDetail } from './front-office/product-detail/product-detail';
import { About } from './front-office/about/about';
import { Favorites } from './front-office/favorites/favorites';
import { ProductManagement } from './back-office/product-management/product-management';
import { ProductForm } from './back-office/product-form/product-form';
import { Login } from './back-office/login/login';
import { ChangePassword } from './back-office/change-password/change-password';
import { Trash } from './back-office/trash/trash';

export const routes: Routes = [
    {path:"home",title:"accueil",component:Home},
    { path:"products",title:"products",component:ProductList},
{path:"products/:id", title:"Product Details", component:ProductDetail},
    { path: 'about', title: 'About', component:About },
   { path: 'favorites', title: 'My Favorites', component: Favorites },
   {path:'productmanagement',title:'management',component:ProductManagement},
   {path:'productform',title:'formulairepeoduit',component:ProductForm},
   {path:'auth',title:'athentification',component:Login},
   {path: 'changepassword',title:'changepassword',component: ChangePassword},
   {
  path: 'trash',
  component: Trash
},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];

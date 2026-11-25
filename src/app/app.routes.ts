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

  // Front Office
  { path: 'home', title: 'Home', component: Home },
  { path: 'products', title: 'Products', component: ProductList },
  { path: 'products/:id', title: 'Product Details', component: ProductDetail },
  { path: 'about', title: 'About', component: About },
  { path: 'favorites', title: 'My Favorites', component: Favorites },

  // Login
  { path: 'auth', title: 'Authentication', component: Login },

  // Back Office
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'productmanagement', pathMatch: 'full' },
      { path: 'productmanagement', title: 'Management', component: ProductManagement },
      { path: 'productform', title: 'Add Product', component: ProductForm },
      { path: 'changepassword', title: 'Change Password', component: ChangePassword },
      { path: 'trash', title: 'Trash', component: Trash }
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

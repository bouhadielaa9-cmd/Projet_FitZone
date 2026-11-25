import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  imports: [RouterLink,RouterLinkActive],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home{
}

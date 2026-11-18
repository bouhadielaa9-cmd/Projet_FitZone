import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home{
}

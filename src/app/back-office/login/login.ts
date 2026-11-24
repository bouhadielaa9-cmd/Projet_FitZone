import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit{
  private readonly loginservice=inject(Auth);
  login=this.loginservice.admin;
  ngOnInit(): void {
    this.loginservice.getlogin().subscribe(
      next=>{ console.log(this.login())},
     
      error=>{console.log('erorr')}
    )
  }
  email=signal('');
  mdp=signal('');
  connect=signal(false)
  verifierlogin():void{
    if(this.email()===this.login()[0].email && this.mdp()===this.login()[0].password){
      this.connect.set(true);
    }
  }
}

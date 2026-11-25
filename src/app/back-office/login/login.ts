import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { RouterLink } from '@angular/router';
import { form, FormField, required, email } from '@angular/forms/signals';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit {

  private readonly loginservice = inject(Auth);
  login=this.loginservice.admin;

  ngOnInit(): void {
    this.loginservice.getlogin().subscribe(
    );
  }
  loginModel = signal({
    email: '',
    mdp: ''
  });

  loginForm = form(this.loginModel, path => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email' });

    required(path.mdp, { message: 'Password is required' });
  });
  loginError=signal('');
  connect = signal(false);
  verifierlogin(): void {
    this.loginError.set('');
    this.connect.set(false);
    if (this.loginForm.email().invalid() || this.loginForm.mdp().invalid()) {
      return;
    }
    if (
      this.loginModel().email === this.login()[0].email &&
      this.loginModel().mdp === this.login()[0].password
    ) {
      this.connect.set(true);
    } else {
      this.loginError.set('Invalid email or password');
    }
  }
}
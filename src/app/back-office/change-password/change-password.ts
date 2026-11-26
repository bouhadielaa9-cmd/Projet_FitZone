import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { form, required,FormField, FormRoot } from '@angular/forms/signals';
@Component({
  imports: [FormsModule,RouterLink,FormField, FormRoot],
  selector: 'app-change-password',
  styleUrl: './change-password.css',
  templateUrl: './change-password.html',
})
export class ChangePassword implements OnInit {
  private readonly loginservice = inject(Auth);
  admin = this.loginservice.admin;
  readonly passwordModel = signal({
  ancienmdp: '',
  nouveaumdp: '',
  confirmation: ''
});
readonly passwordForm = form(this.passwordModel, path => {
  required(path.ancienmdp);
  required(path.nouveaumdp);
  required(path.confirmation);
});
  message = signal('');
  ngOnInit(): void {
    this.loginservice.getlogin().subscribe();
  }
  changermdp(): void {
  const a = this.admin()[0];
  const ancien = this.passwordModel().ancienmdp;
  const nouveau = this.passwordModel().nouveaumdp;
  const confirmation = this.passwordModel().confirmation;


  if (ancien !== a.password) {
    this.message.set('Ancien mot de passe incorrect.');
    return;
  }

  if (nouveau !== confirmation) {
    this.message.set('Les deux nouveaux mots de passe ne correspondent pas.');
    return;
  }

  if (nouveau===ancien) {
    this.message.set('Le nouveau mot de passe doit être différent.');
    return;
  }
  const adminModifie = {
    ...a,
    password: nouveau
  };

  this.loginservice.updatelogin(adminModifie).subscribe({
    next: () => {
      this.message.set('Mot de passe modifié avec succès !');
      this.passwordModel.set({
        ancienmdp: '',
        nouveaumdp: '',
        confirmation: ''
      });
    },
    error: () => {
      this.message.set('Erreur lors de la modification.');
    }
  });
}
}
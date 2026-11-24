import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  imports: [FormsModule,RouterLink],
  selector: 'app-change-password',
  styleUrl: './change-password.css',
  templateUrl: './change-password.html',
})
export class ChangePassword implements OnInit {

  private readonly loginservice = inject(Auth);

  admin = this.loginservice.admin;

  ancienmdp = signal('');
  nouveaumdp = signal('');
  confirmation = signal('');

  message = signal('');

  ngOnInit(): void {
    this.loginservice.getlogin().subscribe();
  }

  changermdp(): void {
    const a=this.admin()[0];
    if (this.ancienmdp() !== a.password) {
      this.message.set('Ancien mot de passe incorrect.');
      return;
    }
    if (this.nouveaumdp() !== this.confirmation()) {
      this.message.set('Les deux nouveaux mots de passe ne correspondent pas.');
      return;
    }
    if (this.nouveaumdp() === this.ancienmdp()) {
      this.message.set('Le nouveau mot de passe doit être différent.');
      return;
    }
    const adminModifie = {
      ...a,
      password: this.nouveaumdp()
    };

    this.loginservice.updatelogin(adminModifie).subscribe({
      next:() => {
        this.message.set('Mot de passe modifié avec succès !');
        this.ancienmdp.set('');
        this.nouveaumdp.set('');
        this.confirmation.set('');
      },
      error: () => {
        this.message.set('Erreur lors de la modification.');
      }
    });
  }
}
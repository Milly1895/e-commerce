import { Component,inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Route } from '@angular/router';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatAnchor],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authService =inject(AuthService); //! Teste em Produção
  private router = inject(Router);

  sair(){
 this.authService.logout();
 this.router.navigateByUrl('/login');
 return;
  }
}

import { Component,inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { Route } from '@angular/router';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatAnchor],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authFacade =inject(AuthFacade); //! Teste em Produção
  private router = inject(Router);

  sair(){
 this.authFacade.sair();
 this.router.navigateByUrl('/login');
 return;
  }
}

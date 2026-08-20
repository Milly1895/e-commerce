import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { inject } from '@angular/core';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { Router } from '@angular/router';
import { NomeLoja } from '../../../core/models/nome-loja';
@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule,MatIconModule,RouterLink, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

private nomeLoja = inject(NomeLoja);

  private carrinhoService = inject(CarrinhoFacade);
  private authFacade = inject(AuthFacade);
  quantidade =this.carrinhoService.quantidadeCarrinho;
  usuarioLogado = this.authFacade.usuarioLogado;
  usuarioAtual = this.authFacade.usuarioAtual;

  private router = inject(Router);

  sair(){
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
  }
}

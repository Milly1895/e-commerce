import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { inject } from '@angular/core';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule,MatIconModule,RouterLink, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  nomeLoja = 'JS.silva'

  private carrinhoService = inject(CarrinhoService);
  private authService = inject(AuthService);
  quantidade =this.carrinhoService.quantidadesItens;
  usuarioLogado = this.authService.usuarioLogado;
  usuarioAtual = this.authService.usuarioAtual;

  sair(){
    this.authService.logout();
  }
}

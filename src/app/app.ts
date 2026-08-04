import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Produto} from './features/produtos/produto/produto';
import { usuarioLogado,login,logout } from './core/auth';
import { Header } from './shared/layout/header/header';
//import { ListaProdutos} from './features/produtos/lista-produtos/lista-produtos';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}

import { Component ,computed,inject,signal} from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

   private authFacade = inject(AuthFacade);
   private router = inject(Router);

  //! Simulação - Indicadores 
   totalProdutosCadastrados = signal(20);
   pedidosPendentes = signal(3);
   usuarioCadastrados = signal (8);

   usuarioAtual =this.authFacade.usuarioAtual;

   mensagemPerfil = computed(()=>{
    const usuario = this.usuarioAtual();
    if (!usuario){
      return('Nenhum usuario Autenticado!');
    }
    return `Usuário autenticado como: ${usuario.perfil}`;
   });

   sair(){
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
   }
}

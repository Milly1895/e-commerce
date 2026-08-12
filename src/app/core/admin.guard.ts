import { inject, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./services/auth.service";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    //! - 1) Verificar se o Usuários está Logado
    if(!authService.usuarioLogado()){
        return router.createUrlTree(['/login']);
    }
    //! - 2) Verificar se o usuário atual (Logado), se tem perfil adm
    if (!authService.admin()){
        return router.createUrlTree(['/acesso-negado'])
    }
    //! - 3) se o usuário estiver Logado e for adm = ACESSO LIBERADO
    return true;
};
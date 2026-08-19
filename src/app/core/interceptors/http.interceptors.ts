import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { AuthFacade } from "../facades/auth.facade";
import { Router } from "@angular/router";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

 const authFacade =inject(AuthFacade);
 const router =inject (Router);
 //! NOVO METODO TOKEN
 const token = authFacade.obterToken();
 //!Requisição de log 
 console.log ('Requisição:',req.url);
 //! Token
    const novaReq = token?
    req.clone({
        setHeaders: {
            Authorization:`Bearer ${token}`,
        },
    }):req;
    //!NOVA REQUISIÇÃO + RESPOSTA DE LOG 
      console.log ('Iterceptando requisição:', req.url);
      return next(novaReq).pipe(
      tap ({
        next: (event) => console.log('RESPONDE: ', event),
        error: (error) => console.log('ERRO:' ,error)
      }),
       
      catchError((error) => {

        console.error('ERRO GLOBAL:', error);

        if (error.status === 401){
            console.warn('Não Autorizado!');
            authFacade.sair();
            router.navigateByUrl('/login');

        }
        if(error.status ===403){
          console.warn('acesso negado, perfil sem permissão');
          router.navigateByUrl('/produtos');
        }

        if (error.status === 500){
            console.warn('Erro Interno do Servidor!');
        }
        return throwError(() => error);
      }),
    );
};
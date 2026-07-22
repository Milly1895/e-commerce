// // import { Routes } from '@angular/router';
// // //import{ ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
// // import{Carrinho} from './features/carrinho/carrinho/carrinho';
// // import{Home} from './features/home/home/home';

// // export const routes: Routes = [
// //     { 
// //         path:'',
// //     component: Home,
// // },
// // //código legado com lazyLoading
// // // {
// // //     path:'produtos',
// // //     component: ListaProdutos,
// // // },
// // {
// //     path:'produtos',
// //     loadComponent: () =>
// //         import('./features/produtos/lista-produtos/lista-produtos').then(m => m.ListaProdutos)
// // },
// // {
// //     path:'carrinho',
// //     component: Carrinho,
// // },
// // ];
//!codigo Final lazyLoading e loadComponent
import { Routes } from "@angular/router";
import { authGuard } from "./core/auth.guard";
export const routes:Routes = [
    {
        path:'',
        loadComponent:()=>
            import('./features/home/home/home').then((m) =>m.Home)
    },
    {
        path:'produtos',
        loadComponent:()=>
            import('./features/produtos/lista-produtos/lista-produtos').then((m) =>m.ListaProdutos)
    },
    {
        path:'carrinho',
        canActivate:[authGuard],
        loadComponent:()=>
            import('./features/carrinho/carrinho/carrinho').then((m)=>m.Carrinho)
    },
    {
        path:'**',
        redirectTo:'',
    },
];
import { Injectable,signal } from "@angular/core";
import { Signal } from "@angular/core";
import { computed } from "@angular/core";
import { single } from "rxjs";
import { ListaProdutos } from "../../features/produtos/lista-produtos/lista-produtos";

@Injectable({
    providedIn: 'root'
})

export class CarrinhoService{
//! Estado Global
private carrinho = signal<{nome: string; preco: number}[]>([]);
//? Seletores
itens = computed(()=> this.carrinho());
quantidadesItens = computed(() => this.carrinho().length);
totalItens = computed(()=>
    this.carrinho().reduce((total,item)=>total=item.preco,0)
);

adicionar(produto:{nome:string; preco:number}){
    this.carrinho.update(lista =>[...lista,produto
 ]);
}
}
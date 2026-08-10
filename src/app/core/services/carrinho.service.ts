import { Injectable,signal } from "@angular/core";
import { Signal } from "@angular/core";
import { computed } from "@angular/core";
import { single } from "rxjs";
import { ListaProdutos } from "../../features/produtos/lista-produtos/lista-produtos";


type ItemCarrinho = {
    nome: string;
    preco:number;
}
@Injectable({
    providedIn: 'root'
})

export class CarrinhoService{
//! Estado Global
private carrinho = signal<ItemCarrinho[]>([]);
//? Seletores
itens = computed(()=> this.carrinho());
quantidadesItens = computed(() => this.carrinho().length);
totalItens = computed(()=>
    this.carrinho().reduce((total,item)=>total=item.preco,0)
);

carrinhoVazio = computed(() => this.carrinho().length === 0);
//Todo: Ações

adicionar(produto:ItemCarrinho){
    this.carrinho.update(lista =>[...lista,produto]);
}
limpar(){
    this.carrinho.set([]);
}

}
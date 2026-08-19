import { effect, inject, Injectable,signal } from "@angular/core";
import { Signal } from "@angular/core";
import { computed } from "@angular/core";
import { single } from "rxjs";
import { ListaProdutos } from "../../features/produtos/lista-produtos/lista-produtos";
import { ItemCarrinho } from "../models/item-carrinho";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { json } from "stream/consumers";

@Injectable({
    providedIn: 'root'
})

export class CarrinhoService{

//! Estado Global
private carrinho = signal<ItemCarrinho[]>(this.carregarcarrinhSalvo());
//? Seletores
itens = computed(()=> this.carrinho());
quantidadesItens = computed(() => this.carrinho().length);  //! Quantidade de itens do carrinho
totalItens = computed(()=>
    this.carrinho().reduce((total,item)=>total=item.preco,0)
);

carrinhoVazio = computed(() => this.carrinho().length === 0);
  //! ========= PERSISTÊNCIA CARRINHO =========
   private platformId = inject(PLATFORM_ID);

   //! Chave de recuperção Localstorage
   private readonly chaveStorage = 'carrinho-storage';

constructor(){
    effect(() =>{
        this.salvarCarrinho(this.carrinho());
    });
}

private estaNoNavegador(): boolean{
    return isPlatformBrowser(this.platformId);
}

private carregarcarrinhSalvo(): ItemCarrinho [] {
    if(!this.estaNoNavegador()){
        return[];
    }
    const dadosSalvos = localStorage.getItem(this.chaveStorage);
    if(!dadosSalvos){
        return[];
    }

    try {
        return JSON.parse(dadosSalvos) as ItemCarrinho[];
        
    }catch{
        return[];
    }
}
private salvarCarrinho(item: ItemCarrinho[]){
    if(!this.estaNoNavegador()){
        return;
    }
    localStorage.setItem(this.chaveStorage, JSON.stringify(item));
}

//Todo: Ações

adicionar(produto:ItemCarrinho){
    this.carrinho.update(lista =>[...lista,produto])
}
limpar(){
    this.carrinho.set([]);
}
removerItem(rmvItem:number){
    this.carrinho.update((listaAtual) =>
    listaAtual.filter((_, index) => index !== rmvItem));
}
}
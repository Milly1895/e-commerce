import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe} from '../../../shared/pipes/preco-formatado-pipe';
import {effect} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import { produtoService } from '../../../core/services/produtos.service';
import { inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import { ProdutoLoja } from '../../../core/models/produto-loja';
import { Header } from '../../../shared/layout/header/header';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe, MatButtonModule, MatCardModule, RouterLink] ,
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  //!remover a lista de produtos,dados carregados via API fakestoreapi
  
  produtos = signal <ProdutoLoja[]>([]);

    //? criar estado de carregamento,
    // ** true:requisição em andamento,exibir indicador no templete
    //! false:esconder indicador e exibir a lista de produtos

    carregando = signal(true);

    //! cria o método para requisição dos produtos

    //?============= MÉTODO HTTP (API) foi modificado para (ProdutosService)
    carregarProdutos(){
      this.carregando.set(true);//!Ativa Loading
      this.erro.set(null); //? limpa o erro anterior

      this.produtosService.buscarProdutos().subscribe({
            next: (dados) => {
              const produtos = this.produtosService.transformarProdutos(dados);
              this.produtos.set(produtos);
              this.carregando.set(false);
            },
            error:(erro) => {
              console.error('Erro ao carregar os Produtos:,',erro);
              this.erro.set('Erro ao carregar Produtos.Verifique sua conexão e tente novamente!');
              this.carregando.set(false);
            },
      });
    } 

  exibirProduto(nome: string) {
   console.log('Produto selecionado: ', nome);
   this.produtoSelecionado.set(nome);
  }
  adicionarProduto() {
    this.produtos.update(listaAtual => [
      ...listaAtual,
     { nome: 'Processador core i5 1455oFS',preco: 2500}
    ]);
  }
  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => { return this.produtos().reduce
      ((total, item) => total + item.preco, 0)});

      valorTotalFormado = computed(() => this.valorTotal().toFixed(2));

    substituirProdutos() {
      this.produtos.set([
        { nome: 'Teclado', preco: 40},
         { nome: 'Mouse', preco: 10},
          { nome: 'Monitor', preco: 100},
           { nome: 'Desktop', preco: 500},
            { nome: 'Headset', preco: 25},
    ]);
  }
  

  //! injetar httpClient dentro de constructor,restruturar constructor
  constructor() {
    
    //! Carregar a API
    this.carregarProdutos();

    
   effect(() => {
    if (typeof document !== 'undefined'){
      document.title = `Produtos (${this.totalProdutos()}) MinhaLoja`;
   } 
  });
 }
 produtoSelecionado = signal<string |null> (null);
 carrinho = signal <{nome: string; preco:number}[]>([]);
 erro =signal <string | null > (null);
 
 adicionarAoCarrinho(produto:ItemCarrinho){
    this.carrinhoFacade.adicionarProdutoCarrinho(produto);
 }
//?========== INJECT =========
private produtosService = inject (produtoService);
public carrinhoFacade = inject (CarrinhoFacade);
 header = inject (Header);

quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
totalCarrinho = this.carrinhoFacade.totalCarrinho;
}


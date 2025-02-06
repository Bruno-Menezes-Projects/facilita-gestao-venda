package com.bruno.mercado.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "produto")
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduto;

    @NotNull
    private String nome;
    @NotNull
    private int quantidade;
    @NotNull
    private int quantidadeMinima;


    public Produto (String nome, int quantidade) {
        this.nome = nome;
        this.quantidade = quantidade;
    }

    public Produto clone(){
        return new Produto(idProduto, nome, quantidade, quantidadeMinima);
    }


}
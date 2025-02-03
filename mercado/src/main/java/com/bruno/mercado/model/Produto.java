package com.bruno.mercado.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;



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
    private BigDecimal valor;
    @NotNull
    private int quantidade;

    public Produto (String nome, BigDecimal valor, int quantidade) {
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
    }

    public Produto clone(){
        return new Produto(idProduto, nome, valor, quantidade);
    }


}
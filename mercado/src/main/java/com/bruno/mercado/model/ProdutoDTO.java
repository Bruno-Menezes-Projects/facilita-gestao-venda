package com.bruno.mercado.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {
    private Long idProduto;
    private int quantidade;
}

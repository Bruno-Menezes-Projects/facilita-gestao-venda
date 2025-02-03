package com.bruno.mercado.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity(name = "venda_produto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendaProduto {
    @EmbeddedId
    private VendaProdutoId id = new VendaProdutoId();

    @Column(nullable = false, columnDefinition = "INT DEFAULT 2")
    private int quantidade;

    private BigDecimal valor;

    // A associação para Produto
    @ManyToOne
    @JoinColumn(name = "id_produto", insertable = false, updatable = false)
    @MapsId("idProduto") // Agora está correto
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "id_venda", insertable = false, updatable = false)
    @MapsId("idVenda") // Agora está correto
    private Venda venda;

}

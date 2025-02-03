package com.bruno.mercado.repository;

import com.bruno.mercado.model.Venda;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.bruno.mercado.model.VendaProduto;

import java.math.BigDecimal;

public interface VendaRepository extends JpaRepository<Venda, Long> {

    // Método para atualizar a quantidade e o valor em um VendaProduto específico
    @Modifying
    @Transactional
    @Query("UPDATE venda_produto vp SET vp.quantidade = :quantidade, vp.valor = :valor WHERE vp.venda.id = :idVenda AND vp.produto.id = :idProduto")
    int updateQuantidadeEValor(@Param("idVenda") Long idVenda,
                               @Param("idProduto") Long idProduto,
                               @Param("quantidade") Integer quantidade,
                               @Param("valor") BigDecimal valor);

}



package com.bruno.mercado.repository;

import com.bruno.mercado.model.Produto;
import com.bruno.mercado.model.Venda;
import com.bruno.mercado.model.VendaProduto;
import com.bruno.mercado.model.VendaProdutoId;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface VendaProdutoRepository extends JpaRepository<VendaProduto, VendaProdutoId> {

    VendaProduto findByVendaAndProduto(Venda venda, Produto produto);

    @Modifying
    @Transactional
    @Query("UPDATE venda_produto vp \n" +
            "SET vp.quantidade = :quantidade, vp.valor = :valor\n" +
            "WHERE vp.id.idVenda = :idVenda AND vp.id.idProduto = :idProduto")
    int updateQuantidadeEValorg(@Param("idVenda") Long idVenda,
                               @Param("idProduto") Long idProduto,
                               @Param("quantidade") Integer quantidade,
                               @Param("valor") BigDecimal valor);

    @Modifying
    @Transactional
    @Query(value = "UPDATE venda_produto " +
            "SET quantidade = :quantidade, valor = :valor " +
            "WHERE id_venda = :idVenda AND id_produto = :idProduto", nativeQuery = true)
    int updateQuantidadeEValor(@Param("idVenda") Long idVenda,
                               @Param("idProduto") Long idProduto,
                               @Param("quantidade") Integer quantidade,
                               @Param("valor") BigDecimal valor);


//    @Modifying
//    @Transactional
//    @Query("UPDATE VendaProduto vp SET vp.quantidade = :quantidade, vp.valor = :valor WHERE vp.id.idVenda = :idVenda AND vp.id.idProduto = :idProduto")
//    int updateQuantidadeEValord(@Param("idVenda") Long idVenda,
//                               @Param("idProduto") Long idProduto,
//                               @Param("quantidade") Integer quantidade,
//                               @Param("valor") BigDecimal valor);



}

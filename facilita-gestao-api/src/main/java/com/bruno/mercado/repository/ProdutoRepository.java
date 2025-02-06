package com.bruno.mercado.repository;

import com.bruno.mercado.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByNomeContainingIgnoreCase(@Param("text") String text);

    List<Produto> findAllByIdProdutoIn(List<Long> ids);

}

package com.bruno.mercado.repository;


import com.bruno.mercado.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContaRepository extends JpaRepository<Conta, Long> {

    List<Conta> findByDescricaoContainingIgnoreCase(@Param("text") String text);
    List<Conta> findByTitularContainingIgnoreCase(@Param("text") String text);
}

package com.bruno.mercado.repository;


import com.bruno.mercado.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContaRepository extends JpaRepository<Conta, Long> {

}

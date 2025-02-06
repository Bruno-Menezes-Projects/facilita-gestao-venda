package com.bruno.mercado.service;

import com.bruno.mercado.model.Conta;
import com.bruno.mercado.repository.ContaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;


    private ResponseEntity<Conta> notFoundReturn(){
        return ResponseEntity.notFound().header("NotFound","Conta não encontrada.").build();
    }

    public ResponseEntity<List<Conta>> getContas(){
        List<Conta> contas = contaRepository.findAll();
        return ResponseEntity.ok().body(contas);
    }

    public ResponseEntity<Conta> getConta(Long id) {
        Optional<Conta> conta = contaRepository.findById(id);
        if (conta.isPresent()) {
            return ResponseEntity.ok(conta.get());
        }
        return notFoundReturn();
    }

    public ResponseEntity<Conta> createConta(Conta conta) {
        Conta contaSalva = contaRepository.save(conta);
        return ResponseEntity.ok(contaSalva);
    }

    public ResponseEntity<Conta> updateConta(Conta conta) {
        Optional<Conta> contaOp = contaRepository.findById(conta.getId());
        if (contaOp.isPresent()) {
            Conta contaSalva = contaRepository.save(conta);
            return ResponseEntity.ok(contaSalva);
        }
        return notFoundReturn();
    }

    public ResponseEntity<Conta> deleteConta(Long id) {
        Optional<Conta> contaOp = contaRepository.findById(id);
        if (contaOp.isPresent()) {
            Conta conta = contaOp.get();
            contaRepository.delete(conta);
            return ResponseEntity.ok(conta);
        }
        return notFoundReturn();
    }


}

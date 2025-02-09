package com.bruno.mercado.service;

import com.bruno.mercado.model.Conta;
import com.bruno.mercado.model.Produto;
import com.bruno.mercado.repository.ContaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
        if (conta != null && conta.getId() == null){
            Conta contaSalva = contaRepository.save(conta);
            return ResponseEntity.ok(contaSalva);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .header("Erro","O Id não deve ser informado.").build();
    }

    public ResponseEntity<Conta> updateConta(Conta contaAtualizada) {
        System.out.println("ALTERACAO Id: "+contaAtualizada.getId());
        Optional<Conta> contaOp = contaRepository.findById(contaAtualizada.getId());
        if (contaOp.isPresent()) {
            Conta contaExistente = contaOp.get();

            // Atualiza apenas os dados necessários
            contaExistente.setSituacao(contaAtualizada.getSituacao());
            contaExistente.setDescricao(contaAtualizada.getDescricao());
            contaExistente.setTitular(contaAtualizada.getTitular());
            contaExistente.setDtVencimento(contaAtualizada.getDtVencimento());

            // Salva no banco
            Conta contaSalva = contaRepository.save(contaExistente);
            return ResponseEntity.ok(contaSalva);
        }
        return ResponseEntity.notFound().build();
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

    public ResponseEntity<Conta> findByTextTitular(String text){
        List<Conta> contaOp = contaRepository.findByTitularContainingIgnoreCase(text);
        if(contaOp.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contaOp.get(0));
    }

    public ResponseEntity<Conta> findByTextDescricao(String text){
        List<Conta> coontaOp = contaRepository.findByDescricaoContainingIgnoreCase(text);
        if(coontaOp.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(coontaOp.get(0));
    }


}

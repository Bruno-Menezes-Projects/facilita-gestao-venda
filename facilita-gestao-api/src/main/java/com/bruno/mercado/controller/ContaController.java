package com.bruno.mercado.controller;


import com.bruno.mercado.model.Conta;
import com.bruno.mercado.model.Produto;
import com.bruno.mercado.service.ContaService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contas")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @Operation(summary = "getContas", description = "Retorna todas as contas.")
    @GetMapping({"","/"})
    public ResponseEntity<List<Conta>> getContas(){
        return contaService.getContas();
    }

    @Operation(summary = "getContaById", description = "Retorna a conta pelo Id.")
    @GetMapping("/{id}")
    public ResponseEntity<Conta> getConta(@PathVariable Long id){
        return contaService.getConta(id);
    }

    @Operation(summary = "createConta", description = "Cria a conta com base nos dados.")
    @PostMapping({"","/"})
    public ResponseEntity<Conta> createConta(@RequestBody Conta conta){
        return contaService.createConta(conta);
    }

    @Operation(summary = "updateConta", description = "Atualiza a conta com base nos dados.")
    @PutMapping({"","/"})
    public ResponseEntity<Conta> updateConta(@RequestBody Conta conta){
        return contaService.updateConta(conta);
    }

    @Operation(summary = "deleteContaById", description = "Deleta a conta pelo Id.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Conta> deleteConta(@PathVariable Long id){
        return contaService.deleteConta(id);
    }

    @Operation(summary = "findByTextTitular", description = "Retorna as contas com base na pesquisa de texto em titular.")
    @GetMapping("/searchTitular/{text}")
    public ResponseEntity<List<Conta>> findByTextTitular(@PathVariable String text){
        return contaService.findByTextTitular(text);
    }

    @Operation(summary = "findByTextDescricao", description = "Retorna as contas com base na pesquisa de texto em descricao.")
    @GetMapping("/searchDescricao/{text}")
    public ResponseEntity<List<Conta>> findByTextDescricao(@PathVariable String text){
        return contaService.findByTextDescricao(text);
    }

    @Operation(summary = "findByTextTitular", description = "Retorna as contas com base na pesquisa de texto em titular.")
    @GetMapping({"/searchTitular/","/searchDescricao/"})
    public ResponseEntity<List<Conta>> findByTextDescricaoTitularVazio(){
        return this.getContas();
    }





}

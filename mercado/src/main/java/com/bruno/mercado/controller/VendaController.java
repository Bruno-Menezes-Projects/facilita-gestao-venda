package com.bruno.mercado.controller;

import com.bruno.mercado.model.ProdutoDTO;
import com.bruno.mercado.model.Venda;
import com.bruno.mercado.repository.ProdutoRepository;
import com.bruno.mercado.service.VendaService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @Operation(summary = "getVendas", description = "Retorna todas as vendas.")
    @GetMapping({"", "/"})
    public ResponseEntity<List<Venda>> getVendas() {
        List<Venda> vendas = vendaService.getAllVendas();
        if (vendas.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(vendas, HttpStatus.OK);
    }

    @Operation(summary = "getVendasById", description = "Retorna a venda pelo Id.")
    @GetMapping("/{id}")
    public ResponseEntity<Venda> getVendaById(@PathVariable Long id) {
        Venda venda = vendaService.getVendaById(id);
        return venda != null ? new ResponseEntity<>(venda, HttpStatus.OK) :
                ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .header("Mensagem de Erro","Venda não encontrada")
                        .build();
    }

    @Operation(summary = "createVenda", description = "Cria uma venda com os dados recebidos (O id não deve ser informado).")
    @PostMapping({"", "/"})
    public ResponseEntity<Venda> createVenda(@RequestBody List<ProdutoDTO> produtos) {
        try {
            Venda novaVenda = vendaService.criarVenda(produtos);
            return new ResponseEntity<>(novaVenda, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "excluiVendaById", description = "Exclui a venda pelo Id.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirVendaById(@PathVariable Long id) {
        boolean removido = vendaService.removerVendaById(id);
        return removido ? new ResponseEntity<>(HttpStatus.NO_CONTENT) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "alterarVenda", description = "Altera a venda com os dados recebidos.")
    @PutMapping({"", "/"})
    public ResponseEntity<Void> alterarVenda(@RequestBody Venda venda) {
        boolean alterado = vendaService.alterarVenda(venda);
        return alterado ? new ResponseEntity<>(HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

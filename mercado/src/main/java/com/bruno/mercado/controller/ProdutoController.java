package com.bruno.mercado.controller;

import com.bruno.mercado.model.Produto;
import com.bruno.mercado.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("/api/v1/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Operation(summary = "getProdutos", description = "Retorna todos os produtos.")
    @GetMapping({"", "/"})
    public List<Produto> getProdutos() {
        return produtoService.getAllProducts();
    }

    @Operation(summary = "getProdutoById", description = "Retorna o produto pelo Id.")
    @GetMapping("/{id}")
    public Produto getProdutoById(@PathVariable Long id) {
        return produtoService.getProductById(id);
    }

    @Operation(summary = "createProduto", description = "Cria um produto com os dados recebidos (O id não deve ser informado).")
    @PostMapping({"", "/"})
    public ResponseEntity<Produto> createProduto(@RequestBody Produto produto) {
        try {
            Produto novoProduto = produtoService.criarProduto(produto);
            return new ResponseEntity<>(novoProduto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "excluiProdutoById", description = "Exclui o produto pelo Id.")
    @DeleteMapping("/{id}")
    public boolean excluiProdutoById(@PathVariable Long id) {
        return produtoService.removeProdutoById(id);
    }

    @Operation(summary = "alterarProduto", description = "Altera o produto com os dados recebidos.")
    @PutMapping({"", "/"})
    public boolean alterarProduto(@RequestBody Produto produto) {
        return produtoService.alterarProduto(produto);
    }

    @Operation(summary = "getProdutosBySearchText", description = "Retorna todos os produtos.")
    @GetMapping({"/searchtext", "/searchtext/"})
    public List<Produto> getProdutosBySearchTextVazio() {
        return produtoService.searchProdutosByText("");
    }

    @Operation(summary = "getProdutosBySearchText", description = "Retorna os Produtos com base na consulta em texto.")
    @GetMapping("/searchtext/{searchText}")
    public List<Produto> getProdutosBySearchText(@PathVariable String searchText) {
        return produtoService.searchProdutosByText(searchText);
    }


}

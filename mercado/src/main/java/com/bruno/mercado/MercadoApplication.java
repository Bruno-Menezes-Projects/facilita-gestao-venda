package com.bruno.mercado;

import com.bruno.mercado.model.Produto;
import com.bruno.mercado.model.ProdutoDTO;
import com.bruno.mercado.model.Venda;
import com.bruno.mercado.model.VendaProduto;
import com.bruno.mercado.service.ProdutoService;
import com.bruno.mercado.service.VendaProdutoService;
import com.bruno.mercado.service.VendaService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class MercadoApplication implements ApplicationRunner {

	@Autowired
	ProdutoService produtoService;

	@Autowired
	VendaService vendaService;

	@Autowired
	VendaProdutoService vendaProdutoService;

	public static void main(String[] args) {
		SpringApplication.run(MercadoApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		Produto prod1 = new Produto("Fone", BigDecimal.valueOf(300),1);
		Produto prod2 = new Produto("Mouse",BigDecimal.valueOf(150),2);
		produtoService.criarProduto(prod1);
		produtoService.criarProduto(prod2);
		List<Produto> produtos = produtoService.getAllProducts();
		List<ProdutoDTO> produtosDTO = new ArrayList<>();
		for (Produto produto : produtos) {
			produtosDTO.add(new ProdutoDTO(produto.getIdProduto(), produto.getQuantidade()));
		}
		Venda venda = new Venda(null, Instant.now(), BigDecimal.ZERO, produtos);
		System.out.println(venda);
		vendaService.criarVenda(produtosDTO);


	}

}

package com.bruno.mercado;

import com.bruno.mercado.model.Produto;
import com.bruno.mercado.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.List;

@SpringBootApplication
public class MercadoApplication implements ApplicationRunner {

	@Autowired
	ProdutoService produtoService;

	public static void main(String[] args) {
		SpringApplication.run(MercadoApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
//		Produto prod1 = new Produto("Fone",10);
//		Produto prod2 = new Produto("Mouse",2);
//		produtoService.criarProduto(prod1);
//		produtoService.criarProduto(prod2);
//		List<Produto> produtos = produtoService.getAllProducts();


	}

}

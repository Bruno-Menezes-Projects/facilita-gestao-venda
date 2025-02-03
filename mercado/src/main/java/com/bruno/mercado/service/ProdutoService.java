package com.bruno.mercado.service;

import com.bruno.mercado.model.Produto;
import com.bruno.mercado.model.ProdutoDTO;
import com.bruno.mercado.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> getAllProducts() {
        return produtoRepository.findAll();
    }

    public Produto getProductById(Long id) {
        // Buscando o produto no banco de dados
        Optional<Produto> produtoOptional = produtoRepository.findById(id);

        // Retorna o produto encontrado ou null (ou você pode lançar uma exceção se preferir)
        return produtoOptional.orElse(null);
    }

    @Transactional
    public Produto criarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    @Transactional
    public boolean removeProdutoById(Long id){
        if(esseProdutoExiste(id)){
            produtoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean alterarProduto(Produto produto) {
        Long id = produto.getIdProduto();
        if (esseProdutoExiste(id)) {
            // Recupera o produto existente
            Produto produtoExistente = produtoRepository.findById(id).orElse(null);

            if (produtoExistente != null) {
                // Atualiza as informações do produto
                produtoExistente.setNome(produto.getNome());
                produtoExistente.setValor(produto.getValor());
//                produtoExistente.setQuantidade(produto.getQuantidade());
//
                // Salva o produto atualizado
                produtoRepository.save(produtoExistente);
                return true;
            }
        }
        return false;
    }

    private boolean esseProdutoExiste(Long id){
        if(getProductById(id) != null){
            return true;
        }
        return false;
    }

    public List<Produto> searchProdutosByText(String texto) {
        return produtoRepository.findByNomeContainingIgnoreCase(texto);
    }


}

package com.bruno.mercado.service;

import com.bruno.mercado.model.Produto;
import com.bruno.mercado.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> getAllProducts() {
        List<Produto> prods = produtoRepository.findAll();
        if (prods.isEmpty()) {
            return new ArrayList<Produto>();
        }
        return prods;
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
    public ResponseEntity<Produto> removeProdutoById(Long id){
        Optional<Produto> produtoOptional = produtoRepository.findById(id);
        if(produtoOptional.isPresent()){
            Produto prod = produtoOptional.get();
            produtoRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .header("Mensagem", "Produto removido com sucesso").body(prod);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .header("Erro", "Produto não encontrado para remoção.").build();
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
                produtoExistente.setQuantidade(produto.getQuantidade());
                produtoExistente.setQuantidadeMinima(produto.getQuantidadeMinima());
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

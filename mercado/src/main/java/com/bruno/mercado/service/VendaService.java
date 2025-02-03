package com.bruno.mercado.service;

import com.bruno.mercado.model.*;
import com.bruno.mercado.repository.ProdutoRepository;
import com.bruno.mercado.repository.VendaProdutoRepository;
import com.bruno.mercado.repository.VendaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    VendaProdutoService vendaProdutoService;

    @Autowired
    VendaProdutoRepository vendaProdutoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Venda> getAllVendas() {
        return vendaRepository.findAll();
    }

    public Venda getVendaById(Long id) {
        return vendaRepository.findById(id).orElse(null);
    }

    private List<Produto> findAllProdutosByProdutosDTO(List<ProdutoDTO> produtosDTO){
        List<Produto> produtos = new ArrayList<>();   // Cria a lista
        for(ProdutoDTO produtoDTO : produtosDTO){
            Long idProd = produtoDTO.getIdProduto();   // Obtem o Id
            Optional<Produto> prodOp = produtoRepository.findById(idProd);   // Obtem o produtoOpcional
            if(prodOp.isPresent()){   // Se ele existe
                Produto produto = prodOp.get().clone();   // Obtem uma copia do produto
                produto.setQuantidade(produtoDTO.getQuantidade());   // Seta a quantidade
                produtos.add(produto);   // Adiciona o produto na lista
            }
        }
        return produtos;
    }

    @Transactional
    public Venda criarVenda(List<ProdutoDTO> produtosDTO) {
        Venda venda = new Venda();
        venda.setDataVenda(Instant.now());
        venda.setValorTotal(BigDecimal.ZERO);

        List<Produto> produtos = findAllProdutosByProdutosDTO(produtosDTO);

//        venda.setProdutos(null);

        // Garante que a venda tem um ID
        venda = vendaRepository.save(venda);

        BigDecimal valorTotal = BigDecimal.ZERO;

        for (Produto produto : produtos) {
            valorTotal = valorTotal.add(produto.getValor().multiply(BigDecimal.valueOf(produto.getQuantidade())));
            VendaProduto vendaProd = VendaProduto.builder()
                    .valor(produto.getValor())
                    .quantidade(produto.getQuantidade())
                    .id(new VendaProdutoId(produto.getIdProduto(), venda.getIdVenda()))
                    .produto(produto)
                    .venda(venda)
                    .build();


            vendaProdutoRepository.save(vendaProd);

            vendaProd = VendaProduto.builder()
                    .valor(produto.getValor())
                    .quantidade(50)
                    .id(new VendaProdutoId(produto.getIdProduto(), venda.getIdVenda()))
                    .produto(produto)
                    .venda(venda)
                    .build();

            vendaProdutoRepository.save(vendaProd);
        }


        venda.setValorTotal(valorTotal);
        return vendaRepository.save(venda);
    }


    @Transactional
    public boolean removerVendaById(Long id) {
        if (vendaRepository.existsById(id)) {
            vendaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean alterarVenda(Venda venda) {
        Long id = venda.getIdVenda();
        if (vendaRepository.existsById(id)) {
            Venda vendaExistente = vendaRepository.findById(id).orElse(null);
            if (vendaExistente != null) {
                vendaExistente.setDataVenda(venda.getDataVenda());
                vendaExistente.setValorTotal(venda.getValorTotal());
                vendaRepository.save(vendaExistente);
                return true;
            }
        }
        return false;
    }

    @Transactional
    public boolean excluirTodasVendas() {
        if (vendaRepository.count() == 0) return false;
        vendaRepository.deleteAll();
        return true;
    }
}

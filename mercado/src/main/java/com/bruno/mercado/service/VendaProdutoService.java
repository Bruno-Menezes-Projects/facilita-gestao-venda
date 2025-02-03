package com.bruno.mercado.service;

import com.bruno.mercado.model.Produto;
import com.bruno.mercado.model.Venda;
import com.bruno.mercado.model.VendaProduto;
import com.bruno.mercado.model.VendaProdutoId;
import com.bruno.mercado.repository.VendaProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class VendaProdutoService {

    @Autowired
    private VendaProdutoRepository vendaProdutoRepository;

    public List<VendaProduto> listarVendaProdutos() {
        return vendaProdutoRepository.findAll();
    }

    public List<VendaProduto> findAll() {
        return vendaProdutoRepository.findAll();
    }

    public VendaProduto findById(VendaProdutoId id) {
        Optional<VendaProduto> ordemOp = vendaProdutoRepository.findById(id);
        return ordemOp.orElse(null);
    }

    public VendaProduto save(VendaProduto vendaProduto) {
//        if (vendaProduto != null && vendaProduto.getId().getIdProduto() != null) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O Id da vendaProduto não deve ser informado.");
//        }
        return vendaProdutoRepository.save(vendaProduto);
    }

    public VendaProduto delete(VendaProdutoId id) {
        VendaProduto vendaProduto = findById(id);
        vendaProdutoRepository.delete(vendaProduto);
        return vendaProduto;
    }

    public VendaProduto update(VendaProduto vendaProduto) {
        return vendaProdutoRepository.save(vendaProduto);
    }

    public VendaProduto findByVendaProduto(Venda venda, Produto produto){
        return vendaProdutoRepository.findByVendaAndProduto(venda, produto);
    }

    public void updateValorQuantidade(Long idVenda, Long idProduto, Integer quantidade,
                                      BigDecimal valor){
        vendaProdutoRepository.updateQuantidadeEValor(idVenda, idProduto, quantidade, valor);

    }

}

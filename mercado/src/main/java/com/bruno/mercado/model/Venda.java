
package com.bruno.mercado.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Entity(name = "venda")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVenda;

    @Column(nullable = false)
    private Instant dataVenda;

    @Column(nullable = false)
    private BigDecimal valorTotal;

    @ManyToMany
    @JoinTable(name = "venda_produto",
        joinColumns = {@JoinColumn(name = "id_venda")},
            inverseJoinColumns = {@JoinColumn(name = "id_produto")})
    private List<Produto> produtos;

}

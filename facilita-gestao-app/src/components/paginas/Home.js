function Home(){
    return(
        <div className="colorWhite">

            <h1>Facilita Gestão</h1>

            <div className="introducao">
                <h2>Proposta do sistema</h2>
                <p>
                    A ideia do Facilita Gestão surgiu com um trabalho de Programação Web, onde o intuito era desenvolver
                    um sistema que abordasse os conceitos estudados e tivesse algum propósito interessante.
                </p>
                <p>
                    Pensando nisso, foi criado um sistema para gerenciar o estoque de um estabelecimento e também controlar
                    a parte de contas a pagar, pagas ou vencidas. Na parte de produtos, é possível inserir e remover um produto,
                    além de poder alterar sua quantidade de estoque.
                </p>
                <p>
                    Uma funcionalidade interessante é que há um alerta sobre o estado do produto, utilizando a
                    quantidade mínima de estoque, indicando se a quantidade está acima do esperado, próxima do limite,
                    abaixo do limite ou esgotada.
                </p>

                <h2>Controle de estoque</h2>
                <p>
                    O controle de estoque permite gerenciar a quantidade de produtos disponíveis, definindo uma
                    quantidade mínima esperada. O sistema gera alertas sobre o estado do estoque, categorizando os
                    produtos como:
                </p>
                <ul>
                    <li><strong>Acima do esperado:</strong> Quantidade suficiente em estoque.</li>
                    <li><strong>Próximo do limite:</strong> Estoque próximo da quantidade mínima.</li>
                    <li><strong>Abaixo do limite:</strong> Necessidade de reposição.</li>
                    <li><strong>Esgotado:</strong> Sem unidades disponíveis.</li>
                </ul>
                <p>
                    É possível incrementar e decrementar a quantidade de produtos de 1 em 1 ou editar todas as informações
                    do produto, incluindo nome, quantidade mínima e estado do estoque.
                </p>

                <h2>Gestão de contas a pagar</h2>
                <p>
                    O sistema também permite o controle de contas do estabelecimento, classificando-as em três estados:
                </p>
                <ul>
                    <li><strong>A pagar:</strong> Contas que ainda não foram quitadas.</li>
                    <li><strong>Paga:</strong> Contas já quitadas.</li>
                    <li><strong>Vencida:</strong> Contas cujo prazo de pagamento já expirou.</li>
                </ul>
                <p>
                    Cada conta possui um <strong>ID</strong>, <strong>titular</strong>, <strong>descrição</strong>, <strong>data de vencimento</strong>
                    e <strong>situação</strong>, permitindo um gerenciamento eficiente das finanças do estabelecimento.
                </p>

                <h2>Operações disponíveis</h2>
                <p>
                    O sistema possibilita as seguintes operações tanto para produtos quanto para contas:
                </p>
                <ul>
                    <li><strong>Inserir:</strong> Adicionar novos produtos e contas ao sistema.</li>
                    <li><strong>Remover:</strong> Excluir produtos e contas desnecessários.</li>
                    <li><strong>Alterar:</strong> Modificar informações de produtos e contas existentes.</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;

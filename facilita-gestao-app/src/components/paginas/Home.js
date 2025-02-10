function Home(){
    return(
        <div className={"colorWhite"}>

            <h1>Facilita Gestão</h1>

            <div className="introducao" >
                <h2>
                    Proposta do sistema
                </h2>
                <p>
                    A ideia do Facilita Gestão surgiu com um trabalho de Programação Web, onde o intuito era desenvolver
                    um sitema que abordasse os conceitos estudados e tivesse algum propósito interessante.
                </p>
                <p>
                    Pensando nisso, foi criado um sistema para gerenciar o estoque de um estabelecimento e também controlar
                    a parte de contas a pagar, pagas ou vencidas. Na parte de produtos, é possível inserir e remover um produto
                    além de poder alterar sua quantidade de estoque.
                </p>
                <p>
                    Uma funcionalidade interessante é que há um alerta sobre qual o estado do produto, utilizando a
                    quantidade mínima de estoque, em que é possível saber se a quantidade está ok, próximo do limite,
                    abaixo do limite, ou esgotado.
                </p>

                <h2>
                    Controle de estoque
                </h2>

                <h2>
                    Gestão de contas a pagar
                </h2>
            </div>
        </div>
    );
}

export default Home;
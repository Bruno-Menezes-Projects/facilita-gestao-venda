import BaseApi from './BaseApi';

class ProdutoApi extends BaseApi{

    getProdutos(setData){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/produtos`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getProdutosByText(setData, searchText){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/produtos/searchtext/${searchText}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getProduto(setData, id){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/produtos/${id}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    incluirProduto(produto){
        const method = "POST";
        const url = `${this.baseUrl}api/v1/produtos`;
        console.log(url);
        super.myFetch({}, method, url, produto);
    }

    alterarProduto(produto){
        const method = "PUT";
        const url = `${this.baseUrl}api/v1/produtos`;
        console.log(url);
        super.myFetch({}, method, url, produto);
    }

    excluir(id){
        const method = "DELETE";
        const url = `${this.baseUrl}api/v1/produtos/${id}`;
        console.log(url);
        super.myFetch({}, method, url);
    }

}

export default ProdutoApi;
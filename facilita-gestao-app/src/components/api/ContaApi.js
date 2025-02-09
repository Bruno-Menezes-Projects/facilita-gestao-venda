import BaseApi from './BaseApi';

class contaApi extends BaseApi{

    baseUrl = "http://localhost:8080/";

    getContas(setData){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/contas`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getContaByTextTitular(setData, searchText){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/contas/searchTitular/${searchText}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getContaByTextDescricao(setData, searchText){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/contas/searchDescricao/${searchText}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getConta(setData, id){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/contas/${id}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    incluirConta(conta){
        const method = "POST";
        const url = `${this.baseUrl}api/v1/contas`;
        console.log(url);
        super.myFetch({}, method, url, conta);
    }

    alterarConta(conta){
        const method = "PUT";
        var idDesejado = conta.id;
        const url = `${this.baseUrl}api/v1/contas/`; // Passando o id na URL
        console.log(url);
        super.myFetch({}, method, url, conta);
    }

    excluir(id){
        const method = "DELETE";
        const url = `${this.baseUrl}api/v1/contas/${id}`;
        console.log(url);
        super.myFetch({}, method, url);
    }

}

export default contaApi;
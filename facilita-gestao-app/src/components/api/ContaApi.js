import BaseApi from './BaseApi';

class contaApi extends BaseApi{

    baseUrl = "http://localhost:8080/";

    getConta(setData){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/contas`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getContaByText(setData, searchText){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/contas/searchtext/${searchText}`;
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
        const url = `${this.baseUrl}api/v1/contas`;
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
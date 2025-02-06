import BaseApi from './BaseApi';

class ServicoApi extends BaseApi{

    getServicos(setData){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/servico/`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getServicosByText(setData, searchText){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/servico/searchText/${searchText}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getServico(setData, id){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/servico/${id}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    incluirServico(servico){
        const method = "POST";
        const url = `${this.baseUrl}api/v1/servico/`;
        console.log(url);
        super.myFetch({}, method, url, servico);
    }

    alterarServico(servico){
        const method = "PUT";
        const url = `${this.baseUrl}api/v1/servico/`;
        console.log(url);
        super.myFetch({}, method, url, servico);
    }

    excluir(id){
        const method = "DELETE";
        const url = `${this.baseUrl}api/v1/servico/${id}`;
        console.log(url);
        super.myFetch({}, method, url);
    }

}

export default ServicoApi;
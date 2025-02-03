import BaseApi from './BaseApi';

class PetApi extends BaseApi{

    getPets(setData){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/pet`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getPetsByText(setData, searchText){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/pet/searchtext/${searchText}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getPet(setData, id){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/pet/${id}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    incluirPet(pet){
        const method = "POST";
        const url = `${this.baseUrl}api/v1/pet`;
        console.log(url);
        super.myFetch({}, method, url, pet);
    }

    alterarPet(pet){
        const method = "PUT";
        const url = `${this.baseUrl}api/v1/pet`;
        console.log(url);
        super.myFetch({}, method, url, pet);
    }

    excluir(id){
        const method = "DELETE";
        const url = `${this.baseUrl}api/v1/pet/${id}`;
        console.log(url);
        super.myFetch({}, method, url);
    }

    excluirTodosOsPets(){
        const method = "DELETE";
        const url = `${this.baseUrl}api/v1/pet`;
        console.log(url);
        super.myFetch({}, method, url);
    }

}

export default PetApi;
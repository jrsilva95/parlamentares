const baseUrl = "https://dadosabertos.camara.leg.br/api/v2/"

const partidosSelect = document.getElementById("partidoSelect");
const parlamentaresList = document.getElementById("parlamentares");

function init(){
    getPartidos();
}

async function getPartidos(url){

    if(!url){
        url = baseUrl + "partidos";
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        
        const dados = json.dados;

        for(var partido of dados){
            partidosSelect.innerHTML += "<option value=\""+ partido.sigla +"\">" + partido.nome + "</option>";
        }

        const links = json.links;

        for(var link of links){
            if(link.rel == "next"){
                getPartidos(link.href)
            }
        }

        console.log("Carregou partidos", url);

      } catch (error) {
        console.error(error.message);
      }

}

function changeListParlamentares(){

    parlamentaresList.innerHTML = '';

    getParlamentares(partidosSelect.value);

}

async function getParlamentares(sigla, url){

    if(!url){
        url = baseUrl + "deputados?siglaPartido=" + sigla;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        
        const dados = json.dados;

        for(var partido of dados){
            parlamentaresList.innerHTML += "<li>" + partido.nome + "</li>";
        }

        const links = json.links;

        for(var link of links){
            if(link.rel == "next"){
                getParlamentares(sigla, link.href)
            }
        }

        console.log("Carregou parlamentares", url);

      } catch (error) {
        console.error(error.message);
      }

}

document.addEventListener('DOMContentLoaded', init, false);

partidosSelect.addEventListener('change', changeListParlamentares, false);

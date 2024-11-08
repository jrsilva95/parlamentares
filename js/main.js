const baseUrl = "https://dadosabertos.camara.leg.br/api/v2/"

const partidosSelect = document.getElementById("partidoSelect");

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
            partidosSelect.innerHTML += "<option value=\""+ partido.id +"\">" + partido.nome + "</option>";
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

document.addEventListener('DOMContentLoaded', init, false);

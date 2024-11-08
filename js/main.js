const baseUrl = "https://dadosabertos.camara.leg.br/api/v2/"

const partidosSelect = document.getElementById("partidoSelect");

async function getPartidos(){

    const url = baseUrl + "partidos";

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        
        const dados = json.dados;

        for(partido in dados){
            partidosSelect.innerHTML += "<option value=\""+ partido.id +"\">" + partido.nome + "</option>";
        }

        console.log("Carregou partidos");

      } catch (error) {
        console.error(error.message);
      }

}

document.addEventListener('DOMContentLoaded', getPartidos, false);

let botonBuscar = document.getElementById('get-pokemon');
let resultado = document.getElementById('resultado');
let selectBuscar = document.getElementById('pokemon-select');

//Función para obtener todos los Pokémos
const getAllPokemon = () => {

    //Llamada a API
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then ((response) => {
            if(!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then((data) => {

            //Con los datos obtenidos, añadimos cada Pokémos como option al select
            for(let i=0; i < data.results.length; i++) {
                let option = document.createElement('option');
                option.value = data.results[i].name;
                option.innerHTML = data.results[i].name;
                selectBuscar.appendChild(option);
            }
        })
        .catch((error) => console.error('Error:', error));
}

//Llamamos a función
getAllPokemon();

//Evento 'click' asociado al botón 'Obtener información'
botonBuscar.addEventListener("click", function() {
    
    let pokemon = selectBuscar.value;

    //Limpiamos DOM
    resultado.innerHTML = '';

    //Vamos creando nuevo DOM según los resultados
    resultado.innerHTML += `
        <h3>${pokemon.charAt(0).toUpperCase()}${pokemon.slice(1)}</h3>
        <h4>Habilidades:</h4>
        <ul>
    `;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then ((response) => {
            if(!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then((data) => {
            //Comprobamos si el Pokémon tiene habilidades para mostrar un resultado u otro
            if (data.abilities.length > 0) {
                for(let i=0; i < data.abilities.length; i++) {
                    resultado.innerHTML += `
                        <li>${data.abilities[i].ability.name.charAt(0).toUpperCase()}${data.abilities[i].ability.name.slice(1)}</li>
                    `;
                }
            } else {
                resultado.innerHTML += `
                    <li>No tiene habilidades...</li>
                `;
            }            
        })
        .catch((error) => console.error('Error:', error));

        resultado.innerHTML += `
            </ul>
        `;
        
})




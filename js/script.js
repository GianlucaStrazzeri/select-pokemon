let botonBuscar = document.getElementById('get-pokemon');
let resultado = document.getElementById('resultado');

botonBuscar.addEventListener("click", function() {
    let selectBuscar = document.getElementById('pokemon-select');
    let pokemon = selectBuscar.value;

    resultado.innerHTML += `
        <h3>${pokemon}</h3>
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

            for(let i=0; i < data.abilities.length; i++) {

                resultado.innerHTML += `
                    <li>${data.abilities[i].ability.name}</li>
                `;
            }

        })
        .catch((error) => console.error('Error:', error));

        resultado.innerHTML += `
            </ul>
        `;
   
})




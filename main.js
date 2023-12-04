document.addEventListener('DOMContentLoaded', async () => {
    const BASE_URL = 'https://pokeapi.co/api/v2/';
    const main = document.querySelector('main');
    const button = document.getElementById('search-pokemon');
    const pokemonInput = document.getElementById('pokemon');
    const btnPrev = document.createElement('button');
    const btnNext = document.createElement('button');
    const divCard = document.createElement('div');
    const divHeader = document.createElement('div');
    const divInfo = document.createElement('div');
    const pokemonName = document.createElement('h2');
    const pokemonType = document.createElement('p');
    const pokemonSizeWeight = document.createElement('p');
    const divDetail = document.createElement('div');
    const divAbilities = document.createElement('div');
    const divFooter = document.createElement('div');
    const img = document.createElement('img');
    const abilitiesContent = document.createElement('ul');
    let card = false;
    let btn = false;
    let abilities = false;
    divCard.className = 'card';
    divCard.appendChild(divHeader);
    divCard.appendChild(divDetail);
    divCard.appendChild(divFooter);
    divHeader.className = 'header';
    divHeader.appendChild(img);
    divHeader.appendChild(divInfo);
    divInfo.className = 'info';
    divInfo.appendChild(pokemonName);
    divInfo.appendChild(pokemonType);
    divInfo.appendChild(pokemonSizeWeight);
    pokemonName.className = 'name';
    pokemonType.className = 'type';
    pokemonSizeWeight.className = 'size-weight';
    divDetail.className = 'details';
    divDetail.appendChild(divAbilities);
    divAbilities.className = 'abilities';
    divAbilities.textContent = 'Capacité : ';
    divFooter.className = 'footer';
    btnNext.className = 'outline';
    btnNext.textContent = 'Suivant';
    btnPrev.textContent = 'Précédent';
    btnPrev.className = 'outline';
    const pokemonSet = async (pokemon) => {
        return {
            id: pokemon.id,
            name: pokemon.name.substring(0, 1).toUpperCase() + pokemon.name.substring(1).toLowerCase(),
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: pokemon.abilities,
            types: pokemon.types,
            pic: pokemon.sprites.other['official-artwork'].front_default,
        }
    }
    const showPokemon = async (name) => {
        try {
            const response = await fetch(BASE_URL + `pokemon/${name}`);
            const pokemon = await response.json();
            console.log(pokemon);
            return await pokemonSet(pokemon);
        } catch (e) {
            console.error(e);
        }
    }

    const getPokemon = async (pokemon) => {
        const detailPokemon = await showPokemon(pokemon);
        return detailPokemon;
    }

    const renderPokemon = async (pokemon) => {
        img.src = pokemon.pic;
        img.alt = `photo${pokemon.name}`;
        pokemonName.textContent = pokemon.name;
        pokemonSizeWeight.textContent = `Taille: ${pokemon.height} Poids: ${pokemon.weight}`
        pokemonTypeLength = pokemon.types.length
        pokemonType.textContent = '';
        pokemon.types.forEach((value, index) => pokemonType.textContent += index === pokemonTypeLength - 1 ? `${value.type.name}` : `${value.type.name}, `);
        if (abilities) {
            const child = abilitiesContent.childElementCount;
            console.log(child);
            for (let i = 0; i < child; i++) {
                abilitiesContent.childNodes[0].remove();
                console.log(abilitiesContent.childElementCount);
            }
        } else {
            abilities = true;
        }

        pokemon.abilities.forEach((value) => {
            const li = document.createElement('li');
            li.textContent = value.ability.name.substring(0, 1).toUpperCase() + value.ability.name.substring(1).toLowerCase();
            abilitiesContent.appendChild(li);
        });
        divFooter.textContent = `${pokemon.name} - © 2023`;
        divAbilities.appendChild(abilitiesContent);
        if (!card) {
            main.appendChild(divCard);
            card = true;
        }
        if(!btn){
            main.appendChild(btnPrev);
            main.appendChild(btnNext);
        }
        btnNext.value = pokemon.id + 1;
        btnPrev.value = pokemon.id - 1;
        if (pokemon.id === 1) {
            btnPrev.style.display = 'none';
        } else if (pokemon.id === 1017) {
            btnNext.style.display = 'none';
        } else {
            btnPrev.style.display = 'inline';
            btnNext.style.display = 'inline';
        }
    }
    button.addEventListener('click', async () => {
        const name = pokemonInput.value;
        const pokemon = await getPokemon(name);
        await renderPokemon(pokemon);
    });
    btnPrev.addEventListener('click', async () => {
        const name = btnPrev?.value;
        const pokemon = await getPokemon(name);
        await renderPokemon(pokemon);
    });
    btnNext.addEventListener('click', async () => {
        const name = btnNext?.value;
        const pokemon = await getPokemon(name);
        await renderPokemon(pokemon);
    });
    pokemonInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const name = pokemonInput.value;
            const pokemon = await getPokemon(name);
            await renderPokemon(pokemon);
        }
    });

});
let currentPokemon; // load Pokedex JSON
let pokemonSpecies; // Load PokemonSpecies JSON
let pokemonTypesArray; 
let pokemonImage;
let pokemonAbilityArray;
let pokemonSpeciesType;
let pokemonStatsArray;
let pokemonBackgroundColor;
let pokemonMovesArray;
let dreamImage;
let homeImage;
let namesArray;
let allPokemon;
let allPokemonImage;
let allPokemonTypesArray;
let allPokemonSpecies;
let cardBackgroundColorVar;
let lastPokeId = 41;
let firstRenderCount = 20;
let scrollEnabled = true;
let pokemonIdMainArray = []
let pokemonNameMainArray = []; // fills in function renderFullPokedex
let searchedPokemonArray = [];
let searchSpeciesArray = [];


async function renderFullPokedex(){
    let pokemonIndex = document.getElementById('show-all-pokemon');
    pokemonIndex.innerHTML += renderFullPokedexHtml();
    await fillIdArray();  
    fetchAndFillPokemonArrays()
}


async function fetchAndFillPokemonArrays() {
    for (let i = 0; i < firstRenderCount; i++) {
        const pokemonId = pokemonIdMainArray[i]

        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        let response = await fetch(url);
        allPokemon = await response.json();

        pokemonNameMainArray.push(allPokemon['name']);
        searchedPokemonArray.push(allPokemon);
        
        let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
        let responseSpecies = await fetch(speciesUrl);
        allPokemonSpecies = await responseSpecies.json();

        searchSpeciesArray.push(allPokemonSpecies['color']['name']);
        renderFullPokedexContent(i);
    }
}


function renderFullPokedexContent(i) {
    fullPokedexVariables();
    let pokemonCards = document.getElementById('pokemon-cards-container')
    pokemonCards.innerHTML += renderPokemonCardsHtml(i);
    
    let PokeCardTypes = document.getElementById(`types-${i}`);
    for (let j = 0; j < allPokemonTypesArray.length; j++) {
        const pokeType = allPokemonTypesArray[j]
        PokeCardTypes.innerHTML += poketypesHtml(pokeType);
    }
    cardBackgroundColor(i);
}


async function loadMorePokeon() {
    for (let i = firstRenderCount; i < pokemonIdMainArray.length; i++) {
        const pokemonId = pokemonIdMainArray[i]

        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        let response = await fetch(url);
        allPokemon = await response.json();

        pokemonNameMainArray.push(allPokemon['name']);
        searchedPokemonArray.push(allPokemon);
        
        let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
        let responseSpecies = await fetch(speciesUrl);
        allPokemonSpecies = await responseSpecies.json();

        searchSpeciesArray.push(allPokemonSpecies['color']['name']);
        renderFullPokedexContent(i);
    }
    hideButton();
}


function searchPokemon() {
    let searchInput = document.getElementById('user-input').value.toLowerCase();
    let pokemonContainer = document.getElementById('pokemon-cards-container');
    pokemonContainer.innerHTML = '';

    for (let i = 0; i < pokemonNameMainArray.length; i++) {
        let name = pokemonNameMainArray[i]
        let pokeId = pokemonIdMainArray[i];

        if (name.includes(searchInput) || pokeId.includes(searchInput)) {
            pokemonContainer.innerHTML += renderSearchPokemonHtml(i)
            let typesContainer = document.getElementById(`types-${i}`)
            let types = searchedPokemonArray[i]['types']

            for (let j = 0; j < types.length; j++) {
                const type = types[j]['type']['name'];
                typesContainer.innerHTML += renderSearchPokemonTypesHtml(type);
            }
            document.getElementById(`pokemon-card-${i}`).style.background = searchSpeciesArray[i];
            changeBgColor(i)
        } 
    }
    hideButton();
}


function changeBgColor(i) {
    let pokemonCard = document.getElementById(`pokemon-card-${i}`);
    let newBg = document.getElementById(`types-${i}`);
    if (searchSpeciesArray[i] === 'white' || searchSpeciesArray[i] === 'yellow') {
        pokemonCard.firstElementChild.style.color = 'black';
        let typeLength = newBg.children.length
        for (let j = 0; j < typeLength; j++) {
            const color = newBg.children[j]
            color.style.backgroundColor = 'rgba(0,0,0,0.3)'
        }
    }
}


async function loadPokedex(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i+1}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i+1}/`;
    let responseSpecies = await fetch(speciesUrl);
    pokemonSpecies = await responseSpecies.json();
     
    variableGlobalDefinition(currentPokemon, pokemonSpecies);
    document.getElementById('show-all-pokemon').innerHTML += renderPokemonDetails();
    renderPokemonInfo(currentPokemon, pokemonSpecies);
    renderAbout();
    toggleScrolling();
    changeColorFromPokeTypes()
}


function changeColorFromPokeTypes() {
    let bgColor = document.getElementById('pokedex');
    let bgNew = document.getElementById('type');
    
    if (pokemonBackgroundColor === 'white' || pokemonBackgroundColor === 'yellow') {
        bgColor.firstElementChild.style.color = 'black';

        let typelength = bgNew.children.length
        console.log(typelength)
        for (let i = 0; i < typelength; i++) {
            const color = bgNew.children[i]
            color.style.backgroundColor = 'rgba(0,0,0,0.3)'
        }
    }
}


function prevNextPokemon(event, id) {
    event.stopPropagation();
    let index = currentPokemon['id']
    scrollEnabled = true;
    if (id === '+') {
        if (index === lastPokeId -1) {
            index = 0
        }
        loadPokedex(index)
    } else {
        if (index === 1) {
            index = lastPokeId
        }
        loadPokedex(index - 2)
    }
    document.getElementById('poke-details-background').remove();
}


function cardBackgroundColor(i) {
    let pokemonCard = document.getElementById(`pokemon-card-${i}`);
    let newBg = document.getElementById(`types-${i}`);
    if (cardBackgroundColorVar === 'white' || cardBackgroundColorVar === 'yellow') {
        pokemonCard.firstElementChild.style.color = 'black';

        let typeLength = newBg.children.length

        for (let j = 0; j < typeLength; j++) {
            const color = newBg.children[j]
            color.style.backgroundColor = 'rgba(0,0,0,0.3)'
        }
    }
    pokemonCard.style.background = cardBackgroundColorVar;
}


function renderPokemonInfo() {
    document.getElementById('pokedex').innerHTML = renderPokemonInfoHtml(currentPokemon, pokemonImage);

    for (let i = 0; i < pokemonTypesArray.length; i++) {
        const pokemonTypes = pokemonTypesArray[i];
        document.getElementById('type').innerHTML += /*html*/`
            <div>${pokemonTypes['type']['name']}</div>
        `        
    }
    document.getElementById(`pokedex`).style.background = pokemonBackgroundColor;
}


function renderAbout() {
    manageMenuHeaderStyles('about');

    let statsCnt = document.getElementById('stats-overview');
    statsCnt.innerHTML = renderAboutHtml(pokemonSpeciesType, currentPokemon);

    let pokemonAbility = document.getElementById('abilities');
    for (let i = 0; i < pokemonAbilityArray.length; i++) {
        const ability = pokemonAbilityArray[i];
        pokemonAbility.innerHTML += /*html*/ `
            ${ability['ability']['name']},`
    }
    deleteLastCharFromAbility()
}


function baseStats() {
    manageMenuHeaderStyles('base-stats');
    let chartBox = document.getElementById('stats-overview');
    chartBox.innerHTML = '';
    chartBox.innerHTML += renderStatChartBoxHtml();
    let statValues = []

    for (let i = 0; i < pokemonStatsArray.length; i++) {
        const stat = pokemonStatsArray[i]
        statValues.push(stat['base_stat'])
    }
    statsAsChart(statValues);
}


function statsAsChart(statValues) {
    const ctx = document.getElementById(`myChart`)

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['hp', 'att.', 'def.', 'sp. att.', 'sp. def.', 'speed', ],
        datasets: [{
            
            data: [statValues[0], statValues[1], statValues[2], statValues[3], statValues[4], statValues[5]], 
            borderWidth: 0
        }]
        },
        options: {
            backgroundColor: ['rgba(255,0,0,0.7)', 'rgba(0,0,255,0.7)', 'rgba(0,0,255,0.7)', 'rgba(0,0,255,0.7)', 'rgba(0,0,255,0.7)', 'rgba(255,255,0,0.7)'],
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false // Hintergrund-Raster (Grid) ausstellen
                    }
                },
                x: {
                    grid: {
                        display: false // Hintergrund-Raster (Grid) ausstellen
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Legende ausstellen
                }
            }
        }
    });
}


function renderNames() {
    manageMenuHeaderStyles('render-names');

    let pokeName = pokemonSpecies['names']
    let statsCnt = document.getElementById('stats-overview');
    statsCnt.innerHTML = renderNamesTableHtml();

    let namesTable = document.getElementById('names-table')
    for (let i = 0; i < namesArray.length; i++) {
        const name = namesArray[i]['name'];
        const nameLanguage = namesArray[i]['language']['name'];
        namesTable.innerHTML += renderNamesHtml(nameLanguage, name);
    }
}


function renderMoves() {
    manageMenuHeaderStyles('moves');

    let statsCnt = document.getElementById('stats-overview');
    statsCnt.innerHTML = renderMovesTableHtml();

    let pokemonMoves = document.getElementById('stats');
    for (let i = 0; i < pokemonMovesArray.length; i++) {
        const move = pokemonMovesArray[i]['move']['name'];
        const moveVersion = pokemonMovesArray[i]['version_group_details'][0]['version_group']['name']
        pokemonMoves.innerHTML += renderMovesHtml(i, move, moveVersion);
    }
}


function manageMenuHeaderStyles(id) {
    let headerElements = document.getElementById('headerCard').children;
    for (let i = 0; i < headerElements.length; i++) {
        headerElements[i].classList.remove('highlight-stats')
    }
    document.getElementById(id).classList.add('highlight-stats')
}


function deleteLastCharFromAbility() {
    let stringT = document.getElementById('abilities').innerHTML;
    stringT = stringT.slice(0, stringT.length -1)
    document.getElementById('abilities').innerHTML = stringT;
}


function fullPokedexVariables() {
    allPokemonImage = allPokemon['sprites']['other']['dream_world']['front_default'];
    allPokemonTypesArray = allPokemon['types'];
    cardBackgroundColorVar = allPokemonSpecies['color']['name'];
}


function variableGlobalDefinition(currentPokemon, pokemonSpecies) {
    pokemonTypesArray = currentPokemon['types'];
    pokemonImage =  currentPokemon['sprites']['other']['official-artwork']['front_default'];
    dreamImage = currentPokemon['sprites']['other']['dream_world']['front_default'];
    homeImage = currentPokemon['sprites']['other']['home']['front_default']
    pokemonAbilityArray = currentPokemon['abilities'];
    pokemonSpeciesType = pokemonSpecies['egg_groups'][0]['name'];
    pokemonStatsArray = currentPokemon['stats'];
    pokemonBackgroundColor = pokemonSpecies['color']['name'];
    pokemonMovesArray = currentPokemon['moves'];
    namesArray = pokemonSpecies['names'];
}

function formatPokemonId(id) {
    let pokemonId = id.toString();
    let number = '#' + pokemonId.padStart(3, '0')
    return number
}


function toggleScrolling() {
    if (scrollEnabled) {
        document.body.style.overflow = 'hidden';
        scrollEnabled = false;
    } else {
        document.body.style.overflow = 'auto';
        scrollEnabled = true;
    }
}


function closePokemonDetailView() {
    document.getElementById('poke-details-background').remove();
    toggleScrolling()
}


function stopPropagation(event) {
    event.stopPropagation();
}


async function fillIdArray() {
    for (let i = 1; i < lastPokeId; i++) {
        pokemonIdMainArray.push(i.toString())
    }
}


function hideButton() {
    if (pokemonNameMainArray.length > firstRenderCount) {
        document.getElementById('more-pokemon-btn').classList.add('d-none');
    }
}

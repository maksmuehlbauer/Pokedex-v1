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
let POKEMON_ID = 1
let allPokemon;
let allPokemonImage;
let allPokemonTypesArray;
let allPokemonSpecies;
let cardBackgroundColorVar;

let PokemonIdMainArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
let pokemonJsons = []; // filles in function renderFullPokedex
let searchedPokemonArray = [];


async function renderFullPokedex(){
    let pokemonIndex = document.getElementById('show-all-pokemon');
    pokemonIndex.innerHTML = '';
    pokemonIndex.innerHTML += renderFullPokedexHtml();

    for (let i = 0; i < PokemonIdMainArray.length; i++) {
        const pokemonId = PokemonIdMainArray[i]

        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        let response = await fetch(url);
        allPokemon = await response.json();

        pokemonJsons.push(url)

        let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
        let responseSpecies = await fetch(speciesUrl);
        allPokemonSpecies = await responseSpecies.json();
        renderFullPokedexContent(i);
    }
}


async function searchUserInput() {
    let userInputString = document.getElementById('user-input').value;
    let userInputNumber = parseInt(userInputString, 10);

    console.log(userInputNumber)
 
    let pokemonContainer = document.getElementById('pokemon-cards-container')
    

    // (PokemonIdMainArray.includes(userInputNumber))
    if (userInputNumber >= 1 && userInputNumber <= pokemonJsons.length) {
        console.log('True')
        pokemonContainer.innerHTML = '';

        let url = `https://pokeapi.co/api/v2/pokemon/${userInputNumber}/`;
        let response = await fetch(url);
        allPokemon = await response.json();


        let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${userInputNumber}/`;
        let responseSpecies = await fetch(speciesUrl);
        searchedPokemonSpecies = await responseSpecies.json();

        renderSearchedPokemonById(pokemonContainer)
    } else {
        pokemonContainer.innerHTML = '';
    }

    if (userInputString === '') {
        console.log('true is empty')
        pokemonContainer.innerHTML = '';
        renderFullPokedex();
    }
}


function renderSearchedPokemonById(pokemonContainer) {
            
    pokemonContainer.innerHTML += 
    /*html*/ `
    <div id="pokemon-card" class="pokemon-card">
        <div class="quick-info">
            <h4>#${allPokemon['id']}</h4>
            <h1>${allPokemon['name']}</h1>
            <div id="types"></div>
        </div>
        <img src=${allPokemon['sprites']['other']['dream_world']['front_default']}>
    </div>
` 
    let PokeCardTypes = document.getElementById(`types`);
    let types = allPokemon['types']
    for (let j = 0; j < types.length; j++) {
        const pokeType = types[j]
        PokeCardTypes.innerHTML += poketypesHtml(pokeType);
    }
    document.getElementById(`pokemon-card`).style.background = searchedPokemonSpecies['color']['name'];
}








async function loadPokedex() {
    let url = `https://pokeapi.co/api/v2/pokemon/${POKEMON_ID}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${POKEMON_ID}/`;
    let responseSpecies = await fetch(speciesUrl);
    pokemonSpecies = await responseSpecies.json();

    // need function parameter for this function ----> variableGlobalDefinition ????????????
    variableGlobalDefinition(currentPokemon, pokemonSpecies)
}


function renderFullPokedexContent(i) {
    fullPokedexVariables();
    let pokemonCards = document.getElementById('pokemon-cards-container')
    pokemonCards.innerHTML += renderPokemonCardsHtml(i);
    cardBackgroundColor(i);

    let PokeCardTypes = document.getElementById(`types-${i}`);
    for (let j = 0; j < allPokemonTypesArray.length; j++) {
        const pokeType = allPokemonTypesArray[j]
        PokeCardTypes.innerHTML += poketypesHtml(pokeType);
    }
}

function cardBackgroundColor(i) {
    document.getElementById(`pokemon-card-${i}`).style.background = cardBackgroundColorVar;
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
    let statsCnt = document.getElementById('stats-overview');
    statsCnt.innerHTML = renderBaseStatsTableHtml();

    let pokemonStats = document.getElementById('stats');
    for (let i = 0; i < pokemonStatsArray.length; i++) {
        const pokemonStat = pokemonStatsArray[i];
        pokemonStats.innerHTML += renderBaseStatsHtml(pokemonStat, i);
    statsAsPercent(i) 
    }
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


function statsAsPercent(i) {
    let width = pokemonStatsArray[i]['base_stat']*2
    document.getElementById(`percent-${i}`).style.width = `${width}px`
}


function manageMenuHeaderStyles(id) {
    let headerElements = document.getElementById('header').children;
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




// HTML Return Functions

function renderPokemonInfoHtml(currentPokemon, pokemonImage) {
    return /*html*/`       
    <div class="general-info">
        <h1>${currentPokemon['name']}</h1>
        <div class='flex-box'>
            <div id="type">
                <!-- for loop pokemonTypesArray -->
            </div>
            <h2>#${currentPokemon['id']}</h2>
        </div>
    </div>
    <div class="poke-img-cnt">
        <img src=${pokemonImage} alt="pokemon-img">
    </div>
`;
}


function renderAboutHtml(pokemonSpeciesType, currentPokemon) {
    return /*html*/ `
    <table class="about-table stats-table">
        <tr>
            <td>Species</td>
            <td>${pokemonSpeciesType}</td>
        </tr>
        <tr>
            <td>Height</td>
            <td>${currentPokemon['height']}</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${currentPokemon['base_experience']}</td>
        </tr>
        <tr>
            <td>Base xp</td>
            <td>${currentPokemon['weight']}</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td id="abilities"></td>
        </tr>
    </table>
`
}


function renderBaseStatsTableHtml() {
    return /*html*/ `
        <table id="stats" class="stats-table">

        </table>
    `
}


function renderBaseStatsHtml(pokemonStat, i) {
    return /*html*/ `
    <tr>
        <td>${pokemonStat['stat']['name']}</td>
        <td>${pokemonStat['base_stat']}</td>
        <td><div id="percent-${i}" class="percent"></div></td>
    </tr>
`
}


function renderMovesHtml(i, move, moveVersion) {
    return `<tr>
                <td>${i}</td>
                <td>${move}</td>
                <td>${moveVersion}</td>
            </tr>
`
}


function renderMovesTableHtml() {
    return /*html*/ `
    <div class="scroll-container">
        <table id="stats" class="move-table">
            <th>Nr.</th>
            <th>Move</th>
            <th>Version</th>
        </table>
    </div>
`
}


function renderNamesTableHtml() {
    return /*html*/ `
        <div class="scroll-container">
            <table id="names-table">
                <th>Lang.</th>
                <th>Name</th>
            </table>
        </div>
    `
}


function renderNamesHtml(nameLanguage, name) {
    return /*html*/ `
        <tr>
            <td>${nameLanguage}</td>
            <td>${name}</td>
        </tr>
    `
}


function renderPokemonDetails() {
    document.getElementById('show-all-pokemon').innerHTML = /*html*/`
        <div id="pokedex">

        </div>
        <div id="stats-container">
            <header id="header">
                <div id="about" class="normal-stats" onclick="renderAbout()">About</div>
                <div id="base-stats" class="normal-stats" onclick="baseStats()">Base Stats</div>
                <div id="render-names" class="normal-stats" onclick="renderNames()">Names</div>
                <div id="moves" class="normal-stats" onclick="renderMoves()">Moves</div>
            </header>
            <div id="stats-overview">

            </div>
        </div>
    `
}


function renderFullPokedexHtml() {
    return /*html*/ `
        <div id="pokemon-index-container">
            <input id="user-input" type="text" placeholder="type pokemon id or name" onkeyup="searchUserInput()">
            <div id="pokemon-cards-container">
                <!-- loop cards -->
            </div>
        </div>
    `
}


function renderPokemonCardsHtml(i) {
    return /*html*/ `
        <div id="pokemon-card-${i}" class="pokemon-card">
            <div class="quick-info">
                <h4>#${allPokemon['id']}</h4>
                <h1>${allPokemon['name']}</h1>
                <div id="types-${i}"></div>
            </div>
            <img src=${allPokemonImage}>
        </div>
    ` 
}

function poketypesHtml(pokeType) {
    return /*html*/`
        <h2 class="allTypes">${pokeType['type']['name']}</h2>
    `
}

function renderPokemonInfoHtml(currentPokemon, pokemonImage) {
    return /*html*/` 
        <div class="general-info">
            <h1>${currentPokemon['name']}</h1>
            <div class='flex-box'>
                <div id="type">
                    <!-- for loop pokemonTypesArray -->
                </div>
                <h4 id="h4">${formatPokemonId(currentPokemon['id'])}</h4>
            </div>
        </div>
        <div class="poke-img-cnt">
            <img src=${pokemonImage} alt="pokemon-img">
        </div>

`;
}


function renderPokemonDetails() {
    return /*html*/`
        <div id="poke-details-background" onclick="closePokemonDetailView(event)">
            <button id="-" class="previous-btn" onclick="prevNextPokemon(event, '-')"><</button>
            <button id="+" class="next-btn" onclick="prevNextPokemon(event, '+')">></button>
            
            <div id="poke-details" onclick="stopPropagation(event)">
                <div id="pokedex">

                </div>
                <div id="stats-container">
                        <header id="headerCard" class="header-card">
                            <div id="about" class="normal-stats" onclick="renderAbout()">About</div>
                            <div id="base-stats" class="normal-stats" onclick="baseStats()">Base Stats</div>
                            <div id="render-names" class="normal-stats" onclick="renderNames()">Names</div>
                            <div id="moves" class="normal-stats" onclick="renderMoves()">Moves</div>
                        </header>
                        <div id="stats-overview">

                        </div>
                </div>
            </div>
        </div>
    `
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


function renderStatChartBoxHtml() {
    return /*html*/`
        <div>
            <canvas id="myChart"></canvas>
        </div>
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


function renderFullPokedexHtml() {
    return /*html*/ `
        <div id="pokemon-index-container">
            
            <div id="pokemon-cards-container">
                <!-- loop cards -->
            </div>
            <button id="more-pokemon-btn" class="more-pokemon-btn" onclick="loadMorePokeon()">load more Pokemon</button>
        </div>
    `
}


function renderPokemonCardsHtml(i) {
    return /*html*/ `
        <div id="pokemon-card-${i}" class="pokemon-card" onclick="loadPokedex(${i})">
            <div class="quick-info">
                <h4 id="h4">${formatPokemonId(allPokemon['id'])}</h4>
                <h1>${allPokemon['name']}</h1>
                <div id="types-${i}"></div>
            </div>
            <img src=${allPokemonImage}>
        </div>
    ` 
}

function poketypesHtml(pokeType) {
    return /*html*/`
        <h2 class="allTypes allTypes-cards">${pokeType['type']['name']}</h2>
    `
}

function renderSearchPokemonTypesHtml(type) {
    return /*html*/ `
        <h2 class="allTypes">${type}</h2>
    `
}

function renderSearchPokemonHtml(i) {
    return /*html*/`
        <div id="pokemon-card-${i}" class="pokemon-card" onclick="loadPokedex(${i})">
            <div class="quick-info">
                <h4 id="h4">${formatPokemonId(searchedPokemonArray[i]['id'])}</h4>
                <h1>${searchedPokemonArray[i]['name']}</h1>
                <div id="types-${i}"></div>
            </div>
            <img src=${searchedPokemonArray[i]['sprites']['other']['dream_world']['front_default']}>
        </div>
    `
}


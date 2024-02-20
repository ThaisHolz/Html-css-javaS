const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result,searchTerm))
}

function displayResults(result, TermoDeBusca) {
    var filteredResults = result.filter(function(artist){
        return artist.name.toLowerCase().includes(TermoDeBusca.toLowerCase());
    });   
    
    if(filteredResults.lenght === 0){
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.add('hidden');
        return;
    }

    filteredResults.forEach(function(artist) {
        const artistName = document.createElement('div');
        artistName.innerText = artist.name;

        const artistImage = document.createElement('img');
        artistImage.src = artist.urlImg;
        artistImage.alt = artist.name;
        
        resultArtist.appendChild(artistName);
        resultArtist.appendChild(artistImage);

        const artistCategory = document.createElement('div');
        artistCategory.innerText = "Artista";
        resultArtist.appendChild(artistCategory);
    });

    resultPlaylist.classList.add('hidden');
    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.trim();
    if(searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
})
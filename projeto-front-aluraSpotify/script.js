const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result,searchTerm))
}

function displayResults(result, TermoDeBusca) {
    result.filter(function(artist){
        return artist.name.toLowerCase().includes(TermoDeBusca.toLowerCase());
    });   
    
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistCategory = document.getElementById('artist-categorie');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
        artistCategory.innerText = "Artista";
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase;
    if(searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
})
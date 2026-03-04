/* 
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr> 
*/

// =====TASK1=====

// Create a variable called albumStore. 
let albumStore;

// Create an async function to load the album data.
async function appInit() {

    // Fetch the album data from the projects data folder (albums.json).
    const res = await fetch('public/data/albums.json');
    const albumData = await res.json();
    albumStore = [...albumData];

    // Render album.
    renderAlbums(albumStore, 'album-rows');
}

// Function to render album.
function renderAlbums(albumData, container) {
    const albumTableBody = document.getElementById(container);
    if (!albumTableBody) {
        return;
    }

    // Clear existing table rows.
    albumTableBody.innerHTML = '';

    // Templating.
    albumData.forEach(album => {
        const { album: albumName, releaseDate, artistName, genres, averageRating, numberReviews } = album;
        const template = `
            <tr>
                <td>${albumName}</td>
                <td>${releaseDate}</td>
                <td>${artistName}</td>
                <td>${genres}</td>
                <td>${averageRating}</td>
                <td>${numberReviews}</td>
            </tr>
        `;
        albumTableBody.insertAdjacentHTML('beforeend', template);
    });
}

// =====TASK2======

// Function to search albums based on text input field
function searchByText(searchTerm) {
    if (!searchTerm) return null; 
    const searchTermLower = searchTerm.toLowerCase(); 

    // Filter albums based on search term
    const searchResults = albumStore.filter(album => {
        return album.artistName.toLowerCase().includes(searchTermLower) ||
               album.album.toLowerCase().includes(searchTermLower);
    });

    return searchResults.length > 0 ? searchResults : null;
}

// Function to search albums based on minimum rating input
function searchByRating(numberRating) {
    if (isNaN(numberRating)) return null; 

    // Filter albums based on minimum rating
    const ratingResults = albumStore.filter(album => {
        return album.averageRating >= numberRating;
    });

    return ratingResults.length > 0 ? ratingResults : null;
}

// Render function to update the table display with search results
function renderSearchResults(searchResults, container) {
    const albumTableBody = document.getElementById(container);
    if (!albumTableBody) {
        return;
    }

    // Clear existing table rows.
    albumTableBody.innerHTML = '';

    // Render search results
    renderAlbums(searchResults, container);
}

// Add a submit event to the form.
function formSubmit(event) {
    event.preventDefault();

    // Get search query and minimum rating values from the form inputs.
    const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();
    const minRating = parseFloat(document.getElementById('min-album-rating-input').value.trim());

    // Search albums based on search query
    const textSearchResults = searchByText(searchQuery);

    // Search albums based on minimum rating
    const ratingSearchResults = searchByRating(minRating);

    // Combine search results if both search query and minimum rating are present
    let combinedResults;
    if (textSearchResults && ratingSearchResults) {
        combinedResults = textSearchResults.filter(album => ratingSearchResults.includes(album));
    } else if (textSearchResults === null && ratingSearchResults === null) {
        combinedResults = null;
    } else {
        combinedResults = textSearchResults || ratingSearchResults;
    }

    // Render search results
    renderSearchResults(combinedResults, 'album-rows');
}

// Add event listener for form submission
const form = document.getElementById('album-search-form')
form.addEventListener('submit', formSubmit);


// ===========BONUS TASK 1=============

// Add event listeners to the cells for average rating and number of reviews
const averageRatingHeader = document.querySelector('#albumn-column-headers th:nth-child(5)');
const numberReviewsHeader = document.querySelector('#albumn-column-headers th:nth-child(6)');

averageRatingHeader.addEventListener('click', () => sortAndRender('averageRating'));
numberReviewsHeader.addEventListener('click', () => sortAndRender('numberReviews'));

// Function to sort album data based on the specified key and re-render
function sortAndRender(sortKey) {
    // Sort the album data based on the specified key in descending order
    albumStore.sort((a, b) => b[sortKey] - a[sortKey]);

    // Re-render the sorted album data
    renderAlbums(albumStore, 'album-rows');
}

// Initialize the application
appInit();
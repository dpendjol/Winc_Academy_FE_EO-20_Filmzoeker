// ---------------------------------------------------//
// ---------------------------------------------------//
// ---------------------------------------------------//


// Global constants for fast finding elements
const container = document.getElementById('movies');
const filter = document.querySelector('.filter');
const searchbar = document.getElementById('search');
const searchYear = document.getElementById('inputYear');

/** DONE
 * Returns LI tags to the DOM and attached it
 * @param  {Array} movies array of movie objects
 */
const addMoviesToDom = (movies) => {
    // clear the DOM
    resetDisplayedMovies();
    // Build all LI tags incl. childeren.
    const allMoviesLi = movies.map(movie => {
        // create all elements
        const newLi = document.createElement('li');
        const newImg = document.createElement('img');
        const newH3 = document.createElement('h3');
        const newA = document.createElement('a');
        const newP = document.createElement('p');
    
        // get the info from de database file
        const title = movie.Title;
        const year = movie.Year;
        const imdbID = movie.imdbID;
        const poster = movie.Poster;
    
        // set all attributes
        newH3.innerText = title;
        newP.innerText = year;
        newLi.classList.add('movies__item');
        newA.setAttribute('href', 'https://www.imdb.com/title/' + imdbID);
        newA.setAttribute('target', '_blanc');
        newA.classList.add('movies__imagelink');
        newImg.setAttribute('src', poster);
        
        // get the tag-nesting right
        newLi.appendChild(newH3);
        newLi.appendChild(newP);
        newLi.appendChild(newA);
        newA.appendChild(newImg);
    
        return newLi;
    });
    // Check if there are movies to display, if not display error
    if (allMoviesLi.length === 0) {
            const newP = document.createElement('li');
            newP.innerText = 'Geen films gevonden die aan je zoekterm voldoen';
            newP.classList.add('error');
            newP.setAttribute('id', 'error')
            container.appendChild(newP);
    } else {
        allMoviesLi.forEach(movie => container.appendChild(movie));
    }
    }

/** DONE
 * Filter the movie database
 * @param  {Array} movies Array of objects
 * @param  {String} filter The filter criteria
 * @return {Array}      array of the selected movies
 */
const getFilterdMovies = function (array, filter) {
    if (filter === 'no-filter') {filter = ''};
     return array.filter((item) => {
          let title = item.Title.toLowerCase();
          return title.includes(filter);
     });
}

/** DONE
 * Filters out the newest movies, all movies after 'afterYear'
 * @param  {Array} movies selection of movies
 * @param  {Number} afterYear the year from which the selection has to come
 * @return {array}      The total of the two numbers
 */
const getNewestMovies = function(array, afterYear = 2014) {
    return array.filter(item => {
        let year = parseInt(item.Year, 10);
        return year > afterYear;
    });
}

/** DONE
 * Reset the radio buttons, when a text search has started
 * @return {}      nothing
 */
const resetRadioButtons = () => {
    const selectedButton = document.querySelector('[name="filter"]:checked');
    if (selectedButton !== null) { selectedButton.checked = false; }
}

/** DONE
 * Clear text in searchbar
 */
const resetSearchBar = () => {
    const searchBar = document.getElementById('search');
    searchbar.value = '';
}

/** DONE
 * Clear the LI tags in de movies container
 */
const resetDisplayedMovies = () => {
    let displayedMovies = container.getElementsByTagName('li');
    Array.from(displayedMovies).forEach(displayMovie => container.removeChild(displayMovie));
}

/** DONE
 * Filles the DOM with movies selected by radiobutton filter
 * Function can be called by a addEventListener method.
 * @param  {Number} e Event object
 */
const handleOnChangeEvent = (e) => {
    resetSearchBar();
    let filterCriteria = e.target.id;
    let movieSelection;
    if (filterCriteria === 'newest' || filterCriteria === 'inputYear') {
        inputYear.parentElement.classList.remove('hide');
        const inputYearNumber = parseInt(searchYear.value, 10);
        movieSelection = getNewestMovies(movies, inputYearNumber);
    } else {
        inputYear.parentElement.classList.add('hide');
        movieSelection = getFilterdMovies(movies, filterCriteria);
    }
    addMoviesToDom(movieSelection);
}

/** DONE
 * Add event listeners to all button tags
 * @param {String} whichTagName tagname on which the event listeners has to be added 
 */
const addEventListeners = (whichTagName) => {
    const tagName = document.getElementsByName(whichTagName);
    Array.from(tagName).forEach(tag => {
        tag.addEventListener('change', handleOnChangeEvent)
    });
}

/** DONE
 * Find the movies 
 * @param {String} whichTagName tagname on which the event listeners has to be added 
 */
const fncSearchBar = () => {
    resetRadioButtons();
    inputYear.parentElement.classList.add('hide');
    movieSelection = getFilterdMovies(movies, searchbar.value);
    addMoviesToDom(movieSelection);
}

// Load standard search (no filter search)
document.addEventListener('DOMContentLoaded', function(event) {
    addMoviesToDom(movies);
    addEventListeners('filter');
    document.getElementById('no-filter').checked = true;
    searchbar.addEventListener('keyup', fncSearchBar);
    searchYear.addEventListener('keyup', handleOnChangeEvent)
    searchYear.addEventListener('change', handleOnChangeEvent)
    document.getElementById('no-filter').checked = true;
});

// Clear out the last search term after focus was lost from SearchBar
document.getElementById('search').addEventListener('focus', resetSearchBar);
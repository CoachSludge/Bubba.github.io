document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "6cdadea12f3332b83ecd4321215bd146";
    const homePage = document.getElementById('homePage');
    const searchPage = document.getElementById('searchPage');
    const searchResultsContainer = document.getElementById('searchResults');
    const backToHomeButton = document.getElementById('backToHome');

    // Back to Home functionality
    backToHomeButton.addEventListener('click', () => {
        searchPage.style.display = 'none';
        homePage.style.display = 'block';
    });

    // Fetch and display popular movies on the homepage
    async function fetchPopularMovies(page = 1) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&page=${page}`);
            if (response.ok) {
                const data = await response.json();
                displaySearchResults(data.results, document.getElementById('popularMovies'));
                updatePaginationControls(data.page, data.total_pages);
                fetchUpcomingMedia();
            } else {
                console.error('Failed to fetch popular media.');
            }
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
    }

    // Fetch and display upcoming movies
    async function fetchUpcomingMedia() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
            if (response.ok) {
                const data = await response.json();
                const upcomingMovies = data.results.filter(media => new Date(media.release_date) > new Date());
                displaySearchResults(upcomingMovies, document.getElementById('upcomingMedia'));
            } else {
                console.error('Failed to fetch upcoming media.');
            }
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
        }
    }

    // Search function for handling search button click
    async function search(query) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`);
            if (response.ok) {
                const data = await response.json();
                displaySearchResults(data.results, searchResultsContainer);
                homePage.style.display = 'none';
                searchPage.style.display = 'block';
            } else {
                console.error('Failed to fetch search results.');
            }
        } catch (error) {
            console.error('Error searching media:', error);
        }
    }

    // Handle search input for both home and search results page
    function handleSearchInput(inputElement) {
        const query = inputElement.value.trim();
        if (query) search(query);
    }

    // Display search results in the specified container
    function displaySearchResults(results, container) {
        container.innerHTML = '';

        results.forEach(media => {
            const mediaCard = document.createElement('div');
            mediaCard.classList.add('bg-zinc-800', 'p-4', 'rounded-lg', 'cursor-pointer', 'transition', 'transform', 'hover:scale-105');

            mediaCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${media.poster_path}" alt="${media.title || media.name}" class="rounded">
                <div class="mt-2">
                    <h3 class="text-lg font-semibold">${media.title || media.name}</h3>
                    <p class="text-zinc-400">Type: ${media.media_type === 'movie' ? 'Movie' : 'TV Show'}</p>
                    <p class="text-sm text-zinc-400">Rating: ${media.vote_average}/10</p>
                    <p class="text-sm text-zinc-400">Release Date: ${media.release_date || media.first_air_date}</p>
                </div>
            `;

            mediaCard.addEventListener('click', function() {
                window.location.href = `media.html?id=${media.id}&type=${media.media_type}`;
            });

            container.appendChild(mediaCard);
        });
    }

    // Pagination controls for popular media section
    function updatePaginationControls(currentPage, totalPages) {
        const prevPageButton = document.getElementById('prevPage');
        const nextPageButton = document.getElementById('nextPage');
        const currentPageSpan = document.getElementById('currentPage');

        currentPageSpan.textContent = currentPage;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;

        prevPageButton.onclick = () => fetchPopularMovies(currentPage - 1);
        nextPageButton.onclick = () => fetchPopularMovies(currentPage + 1);
    }

    // Add event listeners for Enter key on search bars
    function addEnterKeyListener(inputElement) {
        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSearchInput(inputElement);
            }
        });
    }

    // Attach Enter key listener to both search bars
    addEnterKeyListener(document.getElementById('searchInput'));
    addEnterKeyListener(document.getElementById('searchInputPage'));

    // Event listeners for both search buttons on home and search pages
    document.getElementById('searchButton').addEventListener('click', () => handleSearchInput(document.getElementById('searchInput')));
    document.getElementById('searchButtonPage').addEventListener('click', () => handleSearchInput(document.getElementById('searchInputPage')));

    // Initial call to fetch popular movies when page loads
    fetchPopularMovies();
});

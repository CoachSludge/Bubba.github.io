document.addEventListener('DOMContentLoaded', async function () {
    const apiKey = "6cdadea12f3332b83ecd4321215bd146";
    const selectedMovie = document.getElementById('selectedMovie');
    const mediaNameHeader = document.getElementById('mediaNameHeader');
    const seasonEpisodeContainer = document.getElementById('seasonEpisodeContainer');

    const urlParams = new URLSearchParams(window.location.search);
    const mediaId = urlParams.get('id');
    const mediaType = urlParams.get('type');

    async function fetchSelectedMedia(mediaId, mediaType) {
        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${apiKey}`);
        if (response.ok) {
            const media = await response.json();
            mediaNameHeader.textContent = media.title || media.name;
            displaySelectedMedia(media, mediaType);
        } else {
            console.error('Failed to fetch media details.');
        }
    }

    async function displaySelectedMedia(media, mediaType) {
        selectedMovie.innerHTML = `
            <div class="w-1/3">
                <img src="https://image.tmdb.org/t/p/w500${media.poster_path}" alt="${media.title || media.name}" class="rounded-lg">
                <div class="mt-4">
                    <label for="languageSelect" class="block text-sm font-medium text-zinc-300">Select Language:</label>
                    <select id="languageSelect" class="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded focus:outline-none">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                    </select>
                    <label for="providerSelect" class="block text-sm font-medium text-zinc-300 mt-2">Select Content Provider:</label>
                    <select id="providerSelect" class="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded focus:outline-none">
                        <option value="superembed">SuperEmbed</option>
                        <option value="embedsoap">EmbedSoap</option>
                        <option value="autoembed">AutoEmbed</option>
                        <option value="smashystream">SmashyStream</option>
                        <option value="trailer">Trailer</option>
                    </select>
                    ${mediaType === 'movie' ? '<button id="playButton" class="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Play</button>' : ''}
                </div>
            </div>
            <div id="movieInfo" class="w-2/3 pl-4">
                <h2 class="text-2xl font-bold">${media.title || media.name}</h2>
                <p class="text-sm text-zinc-400">${media.release_date || media.first_air_date}</p>
                <p class="mt-4">${media.overview}</p>
                <p class="text-sm text-zinc-400">Type: ${mediaType === 'movie' ? 'Movie' : 'TV Show'}</p>
            </div>
            <div id="videoPlayer" class="w-full h-full rounded-lg overflow-hidden hidden"></div>
        `;

        if (mediaType === 'tv') {
            await createSeasonEpisodeButtons(mediaId);
        } else {
            document.getElementById('playButton').addEventListener('click', () => updateVideoPlayer());
        }

        document.getElementById('languageSelect').addEventListener('change', updateVideoPlayer);
        document.getElementById('providerSelect').addEventListener('change', updateVideoPlayer);
    }

    function updateVideoPlayer() {
        const provider = document.getElementById('providerSelect').value;
        const language = document.getElementById('languageSelect').value;
        const season = seasonEpisodeContainer.getAttribute('data-selected-season') || null;
        const episode = seasonEpisodeContainer.getAttribute('data-selected-episode') || null;

        const videoSrc = generateEmbedLink(mediaId, mediaType, provider, language, season, episode);
        const videoPlayer = document.getElementById('videoPlayer');

        videoPlayer.innerHTML = `<iframe src="${videoSrc}" class="w-full h-96 rounded-lg" allowfullscreen></iframe>`;
        videoPlayer.classList.remove('hidden');
    }

    function generateEmbedLink(mediaId, mediaType, provider, language, season, episode) {
        if (language === 'fr') return `https://frembed.pro/api/${mediaType === 'movie' ? 'film' : 'serie'}.php?id=${mediaId}${season ? `&sa=${season}&epi=${episode}` : ''}`;
        switch (provider) {
            case 'superembed': return mediaType === 'movie'
                ? `https://multiembed.mov/?video_id=${mediaId}&tmdb=1`
                : `https://multiembed.mov/?video_id=${mediaId}&tmdb=1&s=${season}&e=${episode}`;
            case 'embedsoap': return mediaType === 'movie'
                ? `https://www.embedsoap.com/embed/movie/${mediaId}`
                : `https://www.embedsoap.com/embed/tv/?id=${mediaId}&s=${season}&e=${episode}`;
            case 'autoembed': return mediaType === 'movie'
                ? `https://autoembed.co/movie/tmdb/${mediaId}`
                : `https://autoembed.co/tv/tmdb/${mediaId}-${season}-${episode}`;
            case 'smashystream': return mediaType === 'movie'
                ? `https://player.smashy.stream/movie/${mediaId}`
                : `https://player.smashy.stream/tv/${mediaId}?s=${season}&e=${episode}`;
            case 'trailer': return `https://www.youtube.com/embed/${media.trailerKey}`;
            default: return '';
        }
    }

    async function createSeasonEpisodeButtons(mediaId) {
        const seasonData = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}?api_key=${apiKey}`);
        const data = await seasonData.json();

        let seasonButtons = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">';
        data.seasons.forEach(season => {
            seasonButtons += `<button class="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-2 text-sm rounded-lg season-button" data-season="${season.season_number}">Season ${season.season_number}</button>`;
        });
        seasonButtons += '</div>';
        seasonEpisodeContainer.innerHTML = seasonButtons;

        document.querySelectorAll('.season-button').forEach(button => {
            button.addEventListener('click', async (event) => {
                const seasonNumber = event.target.getAttribute('data-season');
                seasonEpisodeContainer.setAttribute('data-selected-season', seasonNumber);

                document.getElementById('episodeButtons')?.remove();

                const response = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}/season/${seasonNumber}?api_key=${apiKey}`);
                const seasonDetails = await response.json();

                let episodeButtons = '<div id="episodeButtons" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">';
                seasonDetails.episodes.forEach(episode => {
                    episodeButtons += `<button class="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-2 text-sm rounded-lg episode-button" data-episode="${episode.episode_number}">Ep ${episode.episode_number}</button>`;
                });
                episodeButtons += '</div>';

                seasonEpisodeContainer.insertAdjacentHTML('beforeend', episodeButtons);

                document.querySelectorAll('.episode-button').forEach(epButton => {
                    epButton.addEventListener('click', (event) => {
                        const episodeNumber = event.target.getAttribute('data-episode');
                        seasonEpisodeContainer.setAttribute('data-selected-episode', episodeNumber);
                        updateVideoPlayer();
                    });
                });

                updateVideoPlayer();
            });
        });
    }

    fetchSelectedMedia(mediaId, mediaType);
});

const key = "d0dda9d58185584c8124a1e6954ab31b"

const requestsUrl = {
    requestsPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`,
    requestsUpcoming:  `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&page=1`,
    requestsNowPlaying:  `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&page=1`,
    requestsTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=1`,
    requestsTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
    requestsDiscover: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    requestsSearch: `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=`,
    requestsMovieById: `https://api.themoviedb.org/3/movie/343611?api_key=d0dda9d58185584c8124a1e6954ab31b`
} 

export default requestsUrl
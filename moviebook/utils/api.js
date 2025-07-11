export const fetchMovies = async () => {
    const API_KEY = 'YOUR_TMDB_API_KEY';
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
  };
  
  export const fetchMovieDetails = async (id) => {
    const API_KEY = 'YOUR_TMDB_API_KEY';
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    );
    if (!response.ok) throw new Error('Failed to fetch movie details');
    return await response.json();
  };
  
  export const fetchRelatedMovies = async (genreId) => {
    const API_KEY = 'YOUR_TMDB_API_KEY';
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=1`
    );
    if (!response.ok) throw new Error('Failed to fetch related movies');
    return await response.json();
  };
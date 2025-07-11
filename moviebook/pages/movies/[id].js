import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchMovieDetails } from '../../../utils/api';
import { fetchRelatedMovies } from '../../../utils/api';

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('movieFavorites')) || [];
  });

  useEffect(() => {
    if (id) {
      const loadMovie = async () => {
        try {
          const data = await fetchMovieDetails(id);
          setMovie(data);
          const related = await fetchRelatedMovies(data.genres[0].id);
          setRelatedMovies(related.results.slice(0, 6));
        } catch (error) {
          console.error('Error fetching movie details:', error);
        } finally {
          setLoading(false);
        }
      };

      loadMovie();
    }
  }, [id]);

  const isMovieFavorite = (id) => favorites.some((movie) => movie.id === id);

  const toggleFavorite = (movie) => {
    if (isMovieFavorite(movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  };

  if (loading) return <div className="text-center py-16">Loading movie details...</div>;
  if (!movie) return <div className="text-center py-16">Movie not found</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={() => toggleFavorite(movie)}
            className={`mt-4 px-4 py-2 rounded-lg ${
              isMovieFavorite(movie.id) ? 'bg-red-500 text-white' : 'bg-white text-blue-600'
            }`}
          >
            {isMovieFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-4">
            {movie.release_date} • ⭐ {movie.vote_average}
          </p>
          <p className="text-lg mb-4">{movie.overview}</p>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Cast</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {movie.credits.cast.slice(0, 6).map((actor) => (
                <div key={actor.id} className="flex flex-col items-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : '/default-profile.jpg'
                    }
                    alt={actor.name}
                    className="w-24 h-24 rounded-full mb-2"
                  />
                  <p className="text-sm font-bold">{actor.name}</p>
                  <p className="text-xs text-gray-600">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Related Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedMovies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <a>
              <div className="relative rounded-lg overflow-hidden shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm">{movie.release_date} • ⭐ {movie.vote_average}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
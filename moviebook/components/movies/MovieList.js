import Card from '../common/Card';
import { useState, useEffect } from 'react';
import { fetchMovies } from '../../utils/api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('movieFavorites')) || [];
  });

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const isMovieFavorite = (id) => favorites.some((movie) => movie.id === id);

  const toggleFavorite = (movie) => {
    if (isMovieFavorite(movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  };

  if (loading) return <div className="text-center py-16">Loading movies...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <a>
            <Card
              item={movie}
              onToggleFavorite={toggleFavorite}
              isFavorite={isMovieFavorite(movie.id)}
            />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
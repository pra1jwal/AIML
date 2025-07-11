import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import { fetchMovieDetails } from '../utils/api';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];
        if (savedFavorites.length > 0) {
          const movieDetails = await Promise.all(
            savedFavorites.map((movie) => fetchMovieDetails(movie.id))
          );
          setFavorites(movieDetails);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  };

  if (loading) return <div className="text-center py-16">Loading favorites...</div>;
  if (favorites.length === 0)
    return (
      <Layout>
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
        <div className="text-center py-16">
          <p>You haven't added any movies to your favorites yet.</p>
          <p>Browse and add movies to see them here!</p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {favorites.map((movie) => (
          <div key={movie.id} className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <p>{movie.release_date} • ⭐ {movie.vote_average}</p>
            </div>
            <button
              onClick={() => removeFavorite(movie.id)}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FavoritesPage;
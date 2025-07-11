import { useState } from 'react';
import { fetchMovies, fetchBooks } from '../../utils/api';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    return {
      movies: JSON.parse(localStorage.getItem('movieFavorites')) || [],
      books: JSON.parse(localStorage.getItem('bookFavorites')) || [],
    };
  });

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);

    try {
      const movies = await fetchMovies(query);
      const books = await fetchBooks(query);

      setResults([...movies.results, ...books]);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (id, type) => {
    return type === 'movie'
      ? favorites.movies.some((movie) => movie.id === id)
      : favorites.books.some((book) => book.id === id);
  };

  const toggleFavorite = (item, type) => {
    if (type === 'movie') {
      if (isFavorite(item.id, 'movie')) {
        setFavorites({
          ...favorites,
          movies: favorites.movies.filter((movie) => movie.id !== item.id),
        });
      } else {
        setFavorites({
          ...favorites,
          movies: [...favorites.movies, item],
        });
      }
      localStorage.setItem('movieFavorites', JSON.stringify(favorites.movies));
    } else {
      if (isFavorite(item.id, 'book')) {
        setFavorites({
          ...favorites,
          books: favorites.books.filter((book) => book.id !== item.id),
        });
      } else {
        setFavorites({
          ...favorites,
          books: [...favorites.books, item],
        });
      }
      localStorage.setItem('bookFavorites', JSON.stringify(favorites.books));
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Search Movies & Books</h1>
      <form onSubmit={search} className="mb-8">
        <div className="flex max-w-lg mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies or books..."
            className="flex-1 px-4 py-2 rounded-l-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-16">Searching...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((item) => (
            <div key={item.id} className="relative">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : item.cover_url || '/default-poster.jpg'
                }
                alt={item.title || item.name || item.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{item.title || item.name || item.title}</h3>
                <p>
                  {item.release_date || item.year || item.publish_year} •
                  {item.vote_average && ` ⭐ ${item.vote_average}`}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item, 'movie');
                }}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isFavorite(item.id, 'movie') ? 'bg-red-500' : 'bg-white'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={isFavorite(item.id, 'movie') ? 'white' : 'none'}
                  viewBox="0 0 24 24"
                  stroke={isFavorite(item.id, 'movie') ? 'white' : 'currentColor'}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p>No results found. Try a different search term.</p>
        </div>
      )}
    </Layout>
  );
};

export default SearchPage;
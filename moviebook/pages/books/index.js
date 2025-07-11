import { useState, useEffect } from 'react';
import { fetchBooks } from '../../utils/api';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('bookFavorites')) || [];
  });

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const isBookFavorite = (id) => favorites.some((book) => book.id === id);

  const toggleFavorite = (book) => {
    if (isBookFavorite(book.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== book.id));
    } else {
      setFavorites([...favorites, book]);
    }
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));
  };

  if (loading) return <div className="text-center py-16">Loading books...</div>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Popular Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="relative">
            <img
              src={book.cover_url || '/default-book.jpg'}
              alt={book.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <p>{book.publish_year} • by {book.author_name}</p>
            </div>
            <button
              onClick={() => toggleFavorite(book)}
              className={`absolute top-4 right-4 p-2 rounded-full ${
                isBookFavorite(book.id) ? 'bg-red-500' : 'bg-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isBookFavorite(book.id) ? 'white' : 'none'}
                viewBox="0 0 24 24"
                stroke={isBookFavorite(book.id) ? 'white' : 'currentColor'}
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
    </Layout>
  );
};

export default BookList;
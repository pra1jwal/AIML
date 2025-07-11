import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [activeTab, setActiveTab] = useState('movies');

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Movie/Book Recommender</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <a
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'movies' ? 'bg-white text-blue-800' : ''
                  }`}
                  onClick={() => setActiveTab('movies')}
                >
                  Movies
                </a>
              </Link>
            </li>
            <li>
              <Link href="/books">
                <a
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'books' ? 'bg-white text-blue-800' : ''
                  }`}
                  onClick={() => setActiveTab('books')}
                >
                  Books
                </a>
              </Link>
            </li>
            <li>
              <Link href="/favorites">
                <a className="px-4 py-2 rounded-lg bg-white text-blue-800">
                  Favorites
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
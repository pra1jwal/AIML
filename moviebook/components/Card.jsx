import { useState } from 'react';

const Card = ({ item, onToggleFavorite, isFavorite }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : '/default-poster.jpg'
        }
        alt={item.title || item.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold">{item.title || item.name}</h3>
        <p className="text-sm">
          {item.release_date || item.year} • {item.vote_average && `⭐ ${item.vote_average}`}
        </p>
      </div>
      {hovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite ? 'bg-red-500' : 'bg-white'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={isFavorite ? 'white' : 'none'}
            viewBox="0 0 24 24"
            stroke={isFavorite ? 'white' : 'currentColor'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Card;
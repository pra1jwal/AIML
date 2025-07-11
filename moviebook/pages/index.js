import { useState, useEffect } from 'react';
import { fetchMovies } from '../utils/api';
import Layout from '../components/common/Layout';
import MovieList from '../components/movies/MovieList';

export default function HomePage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
      <MovieList />
    </Layout>
  );
}
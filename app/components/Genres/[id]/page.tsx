"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import MoviesList from '../../MoviesList/MoviesList';
import Pagination from '../../Pagination/Pagination';
import InfiniteScroll from '../../InfiniteScroll/InfiniteScroll';

interface PageProps {
  params: { id: string }
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genres: { id: number; name: string }[];
}


const Genres: React.FC<PageProps> = ({params}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreMovies = async () =>{
    if (loading) return; // Prevent multiple simultaneous requests
    setLoading(true);
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${params.id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjM4ZTc0NmI4YzA2MDA0Nzk0NGQwZmVjOWRkMTAwMiIsInN1YiI6IjY2MzRhMTA1YzYxNmFjMDEyNTE5YmMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bRgwn4O30cZ3eO4qr_bv9PEqe5YyKBr_MMzkrXVxJkA'
      }
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };  useEffect(() => {
    loadMoreMovies(); // Initial load
  }, [params.id]);
    

  if (movies.length === 0) {
    return <div>Loading...</div>; // Conditional rendering when 'movies' is empty
  }
  return (
    <div className=' overflow-x-auto'>
      <h1 className='flex gap-5 justify-center py-1'>Discover Movies</h1>
      <MoviesList movies={movies}/>
      <InfiniteScroll loadMore={loadMoreMovies}/>
      </div >
  );
};

export default Genres;
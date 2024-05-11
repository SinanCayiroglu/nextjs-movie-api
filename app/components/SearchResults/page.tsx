"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import MoviesList from '../MoviesList/MoviesList';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    name: string;
    total_pages:number;
    genres: { id: number; name: string }[];
  }
  
  const SearchResult = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SearchContent />
      </Suspense>
    );
  };

const SearchContent = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const query = searchParams.get("search");
    const fetchMovie = async (query: string,page:number) => {
      if (query) {
        const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`;
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
        }
      }
    };

    useEffect(() => {
      if (query) {
        fetchMovie(query, page); // Call fetchMovie with both query and page
      }
    }, [query]);

  return (
    <div>
    <div className='flex flex-wrap gap-5 justify-center p-5'>
        <MoviesList movies={movies}/>
      </div>
      <InfiniteScroll loadMore={() => fetchMovie(query, page)}/>
        </div>
  )
}

export default SearchResult
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  name:string;
  genres: { id: number; name: string }[];
}

const Search = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  useEffect(() => {
    const fetchMovie = async (query:string) => {
      if (query) {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
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
          setMovies(data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    if (query) {
      fetchMovie(query); // Call fetchMovie only if query is not null
    }
  }, [query]);

  return (
    <div className="w-full">
      <div className='w-1/2 m-auto'>
      <form  action="/components/Search" className='flex relative'>
        <input type="search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} 
        name='search' className='text-black w-full p-2 rounded-full' />
        <button type='submit' className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-2 absolute bottom-0 right-0'>Search</button>
      </form>
        </div>
      <div className='flex flex-wrap gap-5 justify-center p-5'>
      {movies.map((movie) => (
        <Link href={"/components/Discover/"+movie.id} key={movie.id}>
        <div style={{ width: '250px' }}>
            <h3 className='text-center'>{movie.title}</h3>
            <div><Image src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} width={250} height={250} alt='movie'/></div>
          </div> 
          </Link>
        ))}
        </div>
    </div>
  );
};

export default Search;
"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  name:string;
  genres: { id: number; name: string }[];
}

const Genres = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjM4ZTc0NmI4YzA2MDA0Nzk0NGQwZmVjOWRkMTAwMiIsInN1YiI6IjY2MzRhMTA1YzYxNmFjMDEyNTE5YmMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bRgwn4O30cZ3eO4qr_bv9PEqe5YyKBr_MMzkrXVxJkA'
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.genres);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='m-4'>
    {movies.map((movie) => (
        <Link href={"/components/Genres/"+movie.id} key={movie.id}>
      <button  className='m-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-2'>
        {movie.name}
      </button>
        </Link>
    ))}
  </div>
  )
}

export default Genres
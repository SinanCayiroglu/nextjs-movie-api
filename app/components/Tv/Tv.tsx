"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Discover = () => {
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
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
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  interface Movie{
    id:number;
    title:string;
    name:string;
    poster_path:string;
  }
  return (
    <div className=' overflow-x-auto'>
    <h1 className='flex gap-5 justify-center py-1'>Discover Tv Series</h1>
    <div className='inline-flex gap-5 justify-center p-5'>
      {movies.map((movie:Movie) => (
        <Link href={"/components/Tv/"+movie.id} key={movie.id}>
        <div style={{ width: '250px' }}>
            <h3 className='text-center'>{movie.name}</h3>
            <div><Image src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} width={250} height={250} alt='movie'/></div>
          </div> 
          </Link>
        ))}
        </div>
      </div>
  )
}

export default Discover
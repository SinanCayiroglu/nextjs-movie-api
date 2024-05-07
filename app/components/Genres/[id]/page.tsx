"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Genres = ({params}) => {
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres='+params.id;
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
  }, [params.id]);
  return (
    <div className=' overflow-x-auto'>
    <h1 className='flex gap-5 justify-center py-1'>Discover Movies</h1>
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
  )
}

export default Genres
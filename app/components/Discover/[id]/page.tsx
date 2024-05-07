"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = ({params}) => {

    const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      // Fetch movie data based on the id from params
      const res = await fetch("https://api.themoviedb.org/3/movie/"+params.id+"?api_key=7b38e746b8c060047944d0fec9dd1002")
      const data = await res.json(); 
      setMovie(data);
    };

    fetchMovie();
  }, [params.id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-between w-2/3 m-auto h-screen gap-5 p-10'>
    <div className="flex-1 w-1/2">
    <Image src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} width={250} height={250} alt='movie'/>
    </div>
    <div className="flex-1 flex-col justify-between w-1/2">
    <h1 className='text-3xl mb-4'>{movie.title}</h1>
    <p className='mb-6'>{movie.overview}</p>
    {movie.genres.map((genre, index) => (
      <Link key={index}  href={"/components/Genres/"+genre.id} key={genre.id}>
<button className='m-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-2'>{genre.name}</button>
</Link>))} 
    </div>
</div>
  )
}

export default page
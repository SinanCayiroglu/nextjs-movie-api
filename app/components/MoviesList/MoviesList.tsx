import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Movie from "../Movies/Movies"

  
  interface MoviesListProps {
    movies: Movie[];
  }

const MoviesList: React.FC<MoviesListProps> = ({movies}) => {
  return (
    <div className='flex flex-wrap gap-5 justify-center p-5'>
        {movies.map((movie) => (
            <Link href={movie.name?"/components/Tv/"+movie.id:"/components/Discover/"+movie.id} key={movie.id}>
            <div style={{ width: '250px' }}>
              <h3 className='text-center'>{movie.title||movie.name}</h3>
              <div><Image src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} width={250} height={250} alt='movie'/></div>
            </div> 
          </Link>
        ))}
      </div>
  )
}

export default MoviesList
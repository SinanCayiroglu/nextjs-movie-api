import React from 'react'
import Search from '../Search/page'

const page = () => {
  return (
    <div className='flex flex-col justify-center min-h-96	items-center bg-hero-background bg-contain'>
        <h1 className='text-xl'><span className='font-semibold'>Welcome.</span> 
        <br/>Millions of movies, TV shows and people to discover. Explore now.</h1>
    <Search />
    
    </div>
  )
}

export default page
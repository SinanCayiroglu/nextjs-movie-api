"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';



const Search  = () => {

  return (
    <div className="w-full">
      <div className='w-1/2 m-auto'>
        <form action="/components/SearchResults" className='flex relative'>
          <input type="search" name='search' className='text-black w-full p-2 rounded-full' />
          <button type='submit' className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-2 absolute bottom-0 right-0'>Search</button>
        </form>
      </div>
      </div>
  );
};

export default Search;
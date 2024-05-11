import Link from 'next/link';
import React from 'react'

interface PaginationProps {
    totalPages:number;
    onPageChange:(page:number)=>void
}
const Pagination :React.FC<PaginationProps>= ({totalPages,onPageChange}) => {
    const PageNumbers = []
    for (let i=1;i<=totalPages;i++){
        PageNumbers.push(i)
    }
  return (
    <ul className='flex flex-row items-center justify-center gap-5 px-10'>
        {PageNumbers.map((number)=>(
            <li key={number}>
                <Link onClick={() => onPageChange(number)} href="#">
            {number}
          </Link>
            </li>
        ))}
    </ul>
  )
}

export default Pagination
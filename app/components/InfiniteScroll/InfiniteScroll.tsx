// InfiniteScroll.tsx
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollProps {
  loadMore: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loadMore }) => {
  const {ref, inView} = useInView()
  useEffect(()=>{
    if(inView){
      loadMore()
    }
  },[inView])

  return <div ref={ref} />;
};

export default InfiniteScroll;
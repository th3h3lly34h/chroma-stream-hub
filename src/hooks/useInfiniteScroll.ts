
import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (total: number, initialLimit: number = 10) => {
  const [limit, setLimit] = useState(initialLimit);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const threshold = 100; // pixels before bottom

      if (scrollHeight - (scrollTop + clientHeight) < threshold && limit < total) {
        setLimit(prev => Math.min(prev + 10, total));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [total, limit]);

  return { containerRef, limit, setLimit };
};


import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentRow, ContentCard } from '@/components/content/ContentRow';
import { useApiContent } from '@/hooks/useApiContent';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

const Movies = () => {
  const {
    vodCategories,
    vodStreams,
    selectedVodCategory,
    setSelectedVodCategory,
  } = useApiContent();

  if (!vodCategories || !vodStreams) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container px-4 pt-24">
          <h1 className="mb-6 text-3xl font-bold">Movies</h1>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="mb-4 h-8 w-48" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="aspect-[2/3]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const moviesByCategory = vodCategories.map(category => ({
    category,
    movies: vodStreams.filter(movie => movie.category_id === category.category_id)
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Movies</h1>
        
        {moviesByCategory.map(({ category, movies }) => (
          movies.length > 0 && (
            <ContentRow 
              key={category.category_id}
              title={category.category_name}
              items={movies.map(movie => ({
                id: movie.stream_id.toString(),
                title: movie.name,
                thumbnail: movie.stream_icon,
                type: 'movie',
              }))}
            />
          )
        ))}
      </main>
    </div>
  );
};

export default Movies;

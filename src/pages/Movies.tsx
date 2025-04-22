
import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentRow, ContentCard } from '@/components/content/ContentRow';
import { movies } from '@/data/mockData';

const Movies = () => {
  // Simulated categories
  const actionMovies = movies.filter(movie => movie.genre === 'Action');
  const sciFiMovies = movies.filter(movie => movie.genre === 'Sci-Fi');
  const dramaMovies = movies.filter(movie => movie.genre === 'Drama');
  const crimeMovies = movies.filter(movie => movie.genre === 'Crime');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Movies</h1>
        
        {sciFiMovies.length > 0 && (
          <ContentRow 
            title="Sci-Fi" 
            items={sciFiMovies} 
          />
        )}
        
        {actionMovies.length > 0 && (
          <ContentRow 
            title="Action" 
            items={actionMovies} 
          />
        )}
        
        {dramaMovies.length > 0 && (
          <ContentRow 
            title="Drama" 
            items={dramaMovies} 
          />
        )}
        
        {crimeMovies.length > 0 && (
          <ContentRow 
            title="Crime" 
            items={crimeMovies} 
          />
        )}
        
        <div className="mt-8">
          <h2 className="section-title">All Movies</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <ContentCard key={movie.id} item={movie} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Movies;

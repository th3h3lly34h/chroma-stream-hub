
import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentRow, ContentCard } from '@/components/content/ContentRow';
import { series } from '@/data/mockData';

const Series = () => {
  // Simulated categories
  const sciFiSeries = series.filter(show => show.genre === 'Sci-Fi');
  const dramaSeries = series.filter(show => show.genre === 'Drama');
  const fantasySeries = series.filter(show => show.genre === 'Fantasy');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Series</h1>
        
        {sciFiSeries.length > 0 && (
          <ContentRow 
            title="Sci-Fi" 
            items={sciFiSeries} 
          />
        )}
        
        {dramaSeries.length > 0 && (
          <ContentRow 
            title="Drama" 
            items={dramaSeries} 
          />
        )}
        
        {fantasySeries.length > 0 && (
          <ContentRow 
            title="Fantasy" 
            items={fantasySeries} 
          />
        )}
        
        <div className="mt-8">
          <h2 className="section-title">All Series</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {series.map((show) => (
              <ContentCard key={show.id} item={show} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Series;

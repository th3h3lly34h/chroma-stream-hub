
import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentCard } from '@/components/content/ContentRow';
import { movies, series, liveChannels } from '@/data/mockData';

const Favorites = () => {
  // Mock favorite content (in a real app, this would come from user state)
  const favoriteLiveChannels = [liveChannels[0], liveChannels[3]];
  const favoriteMovies = [movies[1], movies[4]];
  const favoriteSeries = [series[0], series[3]];
  
  const allFavorites = [...favoriteLiveChannels, ...favoriteMovies, ...favoriteSeries];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Favorites</h1>
        
        {allFavorites.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Live Channels</h2>
              {favoriteLiveChannels.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {favoriteLiveChannels.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No favorite live channels yet.</p>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Movies</h2>
              {favoriteMovies.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {favoriteMovies.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No favorite movies yet.</p>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Series</h2>
              {favoriteSeries.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {favoriteSeries.map((item) => (
                    <ContentCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No favorite series yet.</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-lg text-muted-foreground">You haven't added any favorites yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;

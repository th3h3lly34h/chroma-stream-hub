
import React from 'react';
import { HeroSlider } from '@/components/content/HeroSlider';
import { ContentRow } from '@/components/content/ContentRow';
import { Navbar } from '@/components/navigation/Navbar';
import { 
  heroSlides, 
  liveChannels, 
  movies, 
  series, 
  popularContent,
  continueWatching
} from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pb-16">
        <HeroSlider slides={heroSlides} />
        
        <div className="container px-4">
          <ContentRow 
            title="Continue Watching" 
            items={continueWatching} 
            className="mt-6"
          />
          
          <ContentRow 
            title="Live Channels" 
            items={liveChannels} 
          />
          
          <ContentRow 
            title="Popular Movies" 
            items={movies} 
          />
          
          <ContentRow 
            title="Top Series" 
            items={series} 
          />
          
          <ContentRow 
            title="Trending Now" 
            items={popularContent} 
          />
        </div>
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ChromaStream. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

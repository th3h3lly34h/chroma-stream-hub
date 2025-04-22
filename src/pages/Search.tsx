
import React, { useState } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentCard } from '@/components/content/ContentRow';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { movies, series, liveChannels } from '@/data/mockData';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const allContent = [...movies, ...series, ...liveChannels];
  
  const filteredContent = allContent.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.genre && item.genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.year && item.year.includes(searchTerm))
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Search</h1>
        
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for movies, series, channels..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {searchTerm ? (
          <>
            <h2 className="mb-4 text-xl font-semibold">
              {filteredContent.length > 0
                ? `Results for "${searchTerm}"`
                : `No results for "${searchTerm}"`}
            </h2>
            
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredContent.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Try searching for a different term or browse our categories.
              </p>
            )}
          </>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {['Action', 'Drama', 'Sci-Fi', 'News', 'Sports'].map((term) => (
                  <button
                    key={term}
                    className="rounded-full bg-secondary px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSearchTerm(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="mb-4 text-xl font-semibold">Trending</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {allContent.slice(0, 5).map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;


import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentRow, ContentCard } from '@/components/content/ContentRow';
import { liveChannels } from '@/data/mockData';

const LiveTV = () => {
  // Group channels by categories (for now all in one category)
  const newsChannels = liveChannels.slice(0, 2);
  const sportsChannels = liveChannels.slice(2, 4);
  const entertainmentChannels = liveChannels.slice(4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Live TV</h1>
        
        <ContentRow 
          title="News Channels" 
          items={newsChannels} 
        />
        
        <ContentRow 
          title="Sports" 
          items={sportsChannels} 
        />
        
        <ContentRow 
          title="Entertainment" 
          items={entertainmentChannels} 
        />
        
        <div className="mt-8">
          <h2 className="section-title">All Channels</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {liveChannels.map((channel) => (
              <ContentCard key={channel.id} item={channel} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveTV;

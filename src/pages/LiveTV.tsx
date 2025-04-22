
import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentRow, ContentCard } from '@/components/content/ContentRow';
import { useApiContent } from '@/hooks/useApiContent';
import { Skeleton } from '@/components/ui/skeleton';

const LiveTV = () => {
  const {
    liveCategories,
    liveStreams,
    selectedLiveCategory,
    setSelectedLiveCategory,
  } = useApiContent();

  if (!liveCategories || !liveStreams) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container px-4 pt-24">
          <h1 className="mb-6 text-3xl font-bold">Live TV</h1>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="mb-4 h-8 w-48" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <Skeleton key={j} className="aspect-video" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Live TV</h1>
        
        {liveCategories.map((category) => (
          <ContentRow 
            key={category.category_id}
            title={category.category_name}
            items={liveStreams
              .filter(stream => stream.category_id === category.category_id)
              .map(stream => ({
                id: stream.stream_id,
                title: stream.name,
                thumbnail: stream.stream_icon,
                type: 'live' as const,
              }))}
          />
        ))}
      </main>
    </div>
  );
};

export default LiveTV;

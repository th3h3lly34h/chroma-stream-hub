
import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { ContentRow } from '@/components/content/ContentRow';
import { useApiContent } from '@/hooks/useApiContent';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LiveTV = () => {
  const {
    liveCategories,
    liveStreams,
    selectedLiveCategory,
    setSelectedLiveCategory,
  } = useApiContent();

  if (!liveCategories) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container px-4 pt-24">
          <h1 className="mb-6 text-3xl font-bold">Live TV</h1>
          <Skeleton className="h-10 w-full max-w-md mb-8" />
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

        <Tabs 
          value={selectedLiveCategory || liveCategories[0]?.category_id} 
          onValueChange={setSelectedLiveCategory}
          className="mb-8"
        >
          <TabsList className="max-w-full overflow-x-auto">
            {liveCategories.map((category) => (
              <TabsTrigger key={category.category_id} value={category.category_id}>
                {category.category_name}
              </TabsTrigger>
            ))}
          </TabsList>

          {liveCategories.map((category) => (
            <TabsContent key={category.category_id} value={category.category_id}>
              {!liveStreams ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <Skeleton key={j} className="aspect-video" />
                    ))}
                  </div>
                </div>
              ) : (
                <ContentRow 
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
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default LiveTV;

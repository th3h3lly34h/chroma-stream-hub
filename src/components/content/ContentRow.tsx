
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { VideoPlayer } from './VideoPlayer';

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  type: 'live' | 'movie' | 'series';
  year?: string;
  genre?: string;
}

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  className?: string;
}

export const ContentRow = ({ title, items, className }: ContentRowProps) => {
  return (
    <div className={cn('content-section mb-8', className)}>
      <h2 className="section-title mb-4 text-xl font-semibold">{title}</h2>
      <div className="no-scrollbar flex space-x-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

interface ContentCardProps {
  item: ContentItem;
}

export const ContentCard = ({ item }: ContentCardProps) => {
  const { id, title, thumbnail, type, year, genre } = item;
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlayerOpen(true);
  };

  return (
    <>
      <a 
        href={`/watch/${type}/${id}`} 
        onClick={handleClick}
        className="netflix-card min-w-[160px] cursor-pointer transition-transform hover:scale-105 md:min-w-[200px]"
      >
        <div className="relative h-[240px] w-[160px] md:h-[300px] md:w-[200px]">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="gradient-overlay absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="absolute bottom-0 left-0 p-3">
            <h3 className="text-sm font-medium text-white">{title}</h3>
            {year && genre && (
              <p className="text-xs text-gray-300">
                {year} • {genre}
              </p>
            )}
          </div>
        </div>
      </a>
      
      {isPlayerOpen && (
        <VideoPlayer
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          streamId={id}
          streamType={type}
          title={title}
        />
      )}
    </>
  );
};

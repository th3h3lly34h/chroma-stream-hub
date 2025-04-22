
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

export function useApiContent() {
  const { toast } = useToast();

  const { data: liveCategories } = useQuery({
    queryKey: ['liveCategories'],
    queryFn: () => apiService.getLiveCategories(),
    enabled: apiService.isAuthenticated(),
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch live categories"
        });
      }
    }
  });

  const { data: vodCategories } = useQuery({
    queryKey: ['vodCategories'],
    queryFn: () => apiService.getVodCategories(),
    enabled: apiService.isAuthenticated(),
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch VOD categories"
        });
      }
    }
  });

  const { data: seriesCategories } = useQuery({
    queryKey: ['seriesCategories'],
    queryFn: () => apiService.getSeriesCategories(),
    enabled: apiService.isAuthenticated(),
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch series categories"
        });
      }
    }
  });

  const { data: liveStreams } = useQuery({
    queryKey: ['liveStreams'],
    queryFn: () => apiService.getLiveStreams(''),
    enabled: apiService.isAuthenticated(),
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch live streams"
        });
      }
    }
  });

  const { data: vodStreams } = useQuery({
    queryKey: ['vodStreams'],
    queryFn: () => apiService.getVodStreams(''),
    enabled: apiService.isAuthenticated(),
  });

  return {
    liveCategories,
    vodCategories,
    seriesCategories,
    liveStreams,
    vodStreams,
  };
}

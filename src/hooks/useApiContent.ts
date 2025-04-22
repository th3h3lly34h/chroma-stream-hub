import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { LiveStream, VodStream, Category } from '@/types/api';

export function useApiContent() {
  const { toast } = useToast();
  const [selectedLiveCategory, setSelectedLiveCategory] = useState<string>('');
  const [selectedVodCategory, setSelectedVodCategory] = useState<string>('');
  const [selectedSeriesCategory, setSelectedSeriesCategory] = useState<string>('');

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

  // Update live streams query to trigger when category changes
  const { data: liveStreams } = useQuery({
    queryKey: ['liveStreams', selectedLiveCategory],
    queryFn: () => apiService.getLiveStreams(selectedLiveCategory),
    enabled: apiService.isAuthenticated() && !!selectedLiveCategory,
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
    queryKey: ['vodStreams', selectedVodCategory],
    queryFn: () => apiService.getVodStreams(selectedVodCategory),
    enabled: apiService.isAuthenticated() && !!selectedVodCategory,
  });

  // Set initial categories
  useEffect(() => {
    if (liveCategories?.length && !selectedLiveCategory) {
      setSelectedLiveCategory(liveCategories[0].category_id);
    }
    if (vodCategories?.length && !selectedVodCategory) {
      setSelectedVodCategory(vodCategories[0].category_id);
    }
    if (seriesCategories?.length && !selectedSeriesCategory) {
      setSelectedSeriesCategory(seriesCategories[0].category_id);
    }
  }, [liveCategories, vodCategories, seriesCategories]);

  return {
    liveCategories,
    vodCategories,
    seriesCategories,
    liveStreams,
    vodStreams,
    selectedLiveCategory,
    selectedVodCategory,
    selectedSeriesCategory,
    setSelectedLiveCategory,
    setSelectedVodCategory,
    setSelectedSeriesCategory,
  };
}

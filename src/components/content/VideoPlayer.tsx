
import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  streamId: string;
  streamType: 'live' | 'movie' | 'series';
  title: string;
}

export const VideoPlayer = ({ isOpen, onClose, streamId, streamType, title }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (isOpen && videoRef.current) {
      let streamUrl = '';
      
      // Get the authenticated user info to build the stream URL
      const authData = apiService.getAuthData();
      
      if (!authData || !authData.user_info) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Authentication required to play content"
        });
        onClose();
        return;
      }
      
      const { username, password } = authData.user_info;
      const baseUrl = apiService.getBaseUrl();
      
      // Build the appropriate stream URL based on content type
      if (streamType === 'live') {
        streamUrl = `${baseUrl}/live/${username}/${password}/${streamId}.m3u8`;
      } else if (streamType === 'movie') {
        streamUrl = `${baseUrl}/movie/${username}/${password}/${streamId}.mp4`;
      } else if (streamType === 'series') {
        // For series, we'd need episode info - this is simplified
        streamUrl = `${baseUrl}/series/${username}/${password}/${streamId}.mp4`;
      }
      
      if (streamUrl) {
        videoRef.current.src = streamUrl;
        videoRef.current.play().catch(error => {
          console.error("Playback failed:", error);
          toast({
            variant: "destructive",
            title: "Playback Error",
            description: "Failed to start playback. Please try again."
          });
        });
      }
    }
  }, [isOpen, streamId, streamType, onClose, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{title}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          <video 
            ref={videoRef} 
            className="h-full w-full" 
            controls 
            autoPlay
            controlsList="nodownload"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Create a route-based player for direct links
export const VideoPlayerRoute = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  
  const validType = type === 'live' || type === 'movie' || type === 'series' 
    ? type as 'live' | 'movie' | 'series'
    : 'live';
  
  const handleClose = () => {
    navigate(-1);
  };
  
  return id ? (
    <VideoPlayer 
      isOpen={true} 
      onClose={handleClose} 
      streamId={id} 
      streamType={validType}
      title={`Playing ${validType === 'live' ? 'Live Stream' : validType === 'movie' ? 'Movie' : 'Series'} #${id}`}
    />
  ) : null;
};

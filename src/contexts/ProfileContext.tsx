import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  isKidsProfile: boolean;
  credentials: {
    host: string;
    username: string;
    password: string;
  }[];
}

interface ProfileContextType {
  profiles: Profile[];
  activeProfile: Profile | null;
  addProfile: (profile: Omit<Profile, 'id'>) => void;
  switchProfile: (profileId: string) => void;
  updateProfile: (profileId: string, updates: Partial<Omit<Profile, 'id'>>) => void;
  removeProfile: (profileId: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Mock data for profiles
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Main Profile',
    avatar: '/placeholder.svg',
    isKidsProfile: false,
    credentials: [
      {
        host: 'https://example.com',
        username: 'demo',
        password: 'password',
      },
    ],
  },
  {
    id: '2',
    name: 'Kids',
    avatar: '/placeholder.svg',
    isKidsProfile: true,
    credentials: [
      {
        host: 'https://example.com',
        username: 'demo',
        password: 'password',
      },
    ],
  },
];

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // In a real app, we would load profiles from secure storage
    // For now, we'll just use the first profile
    if (profiles.length > 0 && !activeProfile) {
      setActiveProfile(profiles[0]);
    }
  }, [profiles, activeProfile]);

  const addProfile = (profile: Omit<Profile, 'id'>) => {
    const newProfile = {
      ...profile,
      id: Date.now().toString(),
    };
    setProfiles([...profiles, newProfile]);
  };

  const switchProfile = async (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      // Try to authenticate with the first set of credentials
      if (profile.credentials.length > 0) {
        const { host, username, password } = profile.credentials[0];
        const { success, error } = await apiService.authenticate(host, username, password);
        
        if (success) {
          setActiveProfile(profile);
          if (error) {
            // Show warning about expiring subscription
            toast.warning(error);
          }
        } else {
          toast.error(error || 'Authentication failed');
          return;
        }
      }
      setActiveProfile(profile);
    }
  };

  const updateProfile = (profileId: string, updates: Partial<Omit<Profile, 'id'>>) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === profileId ? { ...profile, ...updates } : profile
      )
    );
  };

  const removeProfile = (profileId: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== profileId));
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        addProfile,
        switchProfile,
        updateProfile,
        removeProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

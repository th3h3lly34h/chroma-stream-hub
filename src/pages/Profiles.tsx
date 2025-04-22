
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile, Profile } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

const Profiles = () => {
  const { profiles, activeProfile, addProfile, updateProfile, removeProfile, switchProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const navigate = useNavigate();
  
  const [newProfile, setNewProfile] = useState<Omit<Profile, 'id'>>({
    name: '',
    avatar: '/placeholder.svg',
    isKidsProfile: false,
    credentials: [
      {
        host: '',
        username: '',
        password: '',
      },
    ],
  });

  const handleAddProfile = () => {
    if (newProfile.name.trim()) {
      addProfile(newProfile);
      setIsAddingProfile(false);
      setNewProfile({
        name: '',
        avatar: '/placeholder.svg',
        isKidsProfile: false,
        credentials: [
          {
            host: '',
            username: '',
            password: '',
          },
        ],
      });
    }
  };

  const handleSwitchProfile = (profileId: string) => {
    switchProfile(profileId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          {isEditing ? 'Manage Profiles' : 'Who\'s Watching?'}
        </h1>
        
        {isAddingProfile ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Add New Profile</CardTitle>
              <CardDescription>Create a new profile for another person using this device.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  placeholder="Enter profile name"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="kids-mode"
                  checked={newProfile.isKidsProfile}
                  onCheckedChange={(checked) => setNewProfile({ ...newProfile, isKidsProfile: checked })}
                />
                <Label htmlFor="kids-mode">Kids Profile</Label>
              </div>
              
              <div className="space-y-2">
                <Label>Credentials</Label>
                <div className="space-y-2 rounded-md border border-border p-3">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="host">Server Host</Label>
                    <Input
                      id="host"
                      value={newProfile.credentials[0].host}
                      onChange={(e) => setNewProfile({
                        ...newProfile,
                        credentials: [
                          {
                            ...newProfile.credentials[0],
                            host: e.target.value,
                          },
                        ],
                      })}
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={newProfile.credentials[0].username}
                      onChange={(e) => setNewProfile({
                        ...newProfile,
                        credentials: [
                          {
                            ...newProfile.credentials[0],
                            username: e.target.value,
                          },
                        ],
                      })}
                      placeholder="username"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newProfile.credentials[0].password}
                      onChange={(e) => setNewProfile({
                        ...newProfile,
                        credentials: [
                          {
                            ...newProfile.credentials[0],
                            password: e.target.value,
                          },
                        ],
                      })}
                      placeholder="password"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsAddingProfile(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProfile}>
                Save Profile
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex flex-col items-center space-y-2"
                >
                  <button
                    className={`relative rounded-md p-1 transition-all duration-200 ${
                      isEditing ? 'hover:bg-secondary' : 'hover:scale-105'
                    }`}
                    onClick={() => isEditing ? {} : handleSwitchProfile(profile.id)}
                  >
                    <Avatar className="h-24 w-24 md:h-32 md:w-32">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-primary text-3xl text-primary-foreground">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {profile.isKidsProfile && (
                      <span className="absolute bottom-0 right-0 rounded-full bg-accent px-2 py-1 text-xs text-accent-foreground">
                        Kids
                      </span>
                    )}
                  </button>
                  <span className="text-center font-medium">{profile.name}</span>
                  
                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProfile(profile.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              
              {profiles.length < 5 && (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <button
                    className="flex h-24 w-24 items-center justify-center rounded-md border-2 border-dashed border-border bg-secondary text-4xl text-muted-foreground transition-colors hover:border-primary hover:text-primary md:h-32 md:w-32"
                    onClick={() => setIsAddingProfile(true)}
                  >
                    +
                  </button>
                  <span className="text-center font-medium">Add Profile</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              {isEditing ? (
                <Button onClick={() => setIsEditing(false)}>
                  Done
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Manage Profiles
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profiles;

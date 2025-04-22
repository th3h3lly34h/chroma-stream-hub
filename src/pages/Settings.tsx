
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { useProfile } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '@/components/ui/card';

const Settings = () => {
  const { activeProfile } = useProfile();
  
  // Placeholder state (in a real app, these would be stored in user preferences)
  const [autoplay, setAutoplay] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const [defaultQuality, setDefaultQuality] = React.useState([720]);
  
  if (!activeProfile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">No Active Profile</h1>
          <p className="mb-4">Please select a profile to access settings.</p>
          <Button asChild>
            <Link to="/profiles">Select Profile</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 pt-24">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Playback Settings</CardTitle>
              <CardDescription>Customize your viewing experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoplay" className="text-base">Autoplay Next Episode</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically play the next episode in a series
                  </p>
                </div>
                <Switch
                  id="autoplay"
                  checked={autoplay}
                  onCheckedChange={setAutoplay}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quality-slider" className="text-base">Default Streaming Quality</Label>
                <p className="text-sm text-muted-foreground">
                  {defaultQuality[0] === 240 && 'Low (240p)'}
                  {defaultQuality[0] === 480 && 'Medium (480p)'}
                  {defaultQuality[0] === 720 && 'High (720p)'}
                  {defaultQuality[0] === 1080 && 'Full HD (1080p)'}
                </p>
                <Slider
                  id="quality-slider"
                  defaultValue={defaultQuality}
                  max={1080}
                  min={240}
                  step={240}
                  onValueChange={setDefaultQuality}
                  marks={[
                    { value: 240, label: '240p' },
                    { value: 480, label: '480p' },
                    { value: 720, label: '720p' },
                    { value: 1080, label: '1080p' }
                  ]}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Customize the app appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme throughout the application
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new content and reminders
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your profile and credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base">Active Profile</Label>
                <p className="text-lg font-medium">{activeProfile.name}</p>
              </div>
              
              <div>
                <Label className="text-base">Server Details</Label>
                <p className="text-sm text-muted-foreground">
                  {activeProfile.credentials.length > 0
                    ? activeProfile.credentials[0].host
                    : 'No server configured'}
                </p>
              </div>
              
              <div className="pt-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/profiles">
                    Manage Profiles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>Application information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="font-medium">ChromaStream</span> - Version 1.0.0
              </p>
              <p className="text-sm text-muted-foreground">
                A next-generation IPTV streaming platform providing access to live TV,
                movies, and series with a fluid, modern user experience.
              </p>
              <p className="text-sm text-muted-foreground pt-2">
                &copy; {new Date().getFullYear()} ChromaStream. All rights reserved.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;

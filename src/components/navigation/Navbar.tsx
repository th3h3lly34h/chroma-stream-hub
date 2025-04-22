
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Film, Tv, Play } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const { activeProfile, profiles, switchProfile } = useProfile();
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-white">
            ChromaStream
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavItem icon={<Tv className="h-4 w-4" />} label="Live TV" to="/live" />
            <NavItem icon={<Film className="h-4 w-4" />} label="Movies" to="/movies" />
            <NavItem icon={<Play className="h-4 w-4" />} label="Series" to="/series" />
            <NavItem icon={<Heart className="h-4 w-4" />} label="Favorites" to="/favorites" />
            <NavItem icon={<Search className="h-4 w-4" />} label="Search" to="/search" />
          </div>
        </div>

        {activeProfile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 rounded-full p-1 hover:bg-secondary">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activeProfile.avatar} alt={activeProfile.name} />
                  <AvatarFallback className="bg-iptv-purple text-white">
                    {activeProfile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Profiles</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {profiles.map((profile) => (
                <DropdownMenuItem
                  key={profile.id}
                  className={`flex cursor-pointer items-center space-x-2 ${
                    profile.id === activeProfile.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => switchProfile(profile.id)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-iptv-purple text-white">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{profile.name}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profiles" className="cursor-pointer">
                  Manage Profiles
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem = ({ icon, label, to }: NavItemProps) => (
  <Link
    to={to}
    className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm text-white hover:bg-secondary"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

import { Link } from 'react-router-dom';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const PRESET_AVATARS = [
  '/images/avatars/avatar1.png',
  '/images/avatars/avatar2.png',
  '/images/avatars/avatar3.jpg',
  '/images/avatars/avatar4.jpeg',
  '/images/avatars/avatar5.png',
  '/images/avatars/avatar6.png',
  '/images/avatars/avatar7.jpg',
  '/images/avatars/avatar8.jpeg',
  '/images/avatars/avatar9.jpg',
  '/images/avatars/avatar10.png'
];

const ProfileMenu = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Successfully signed out');
    }
  };

  const handleAvatarChange = async (file) => {
    try {
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      toast.success('Avatar updated successfully');
      window.location.reload(); // Refresh to show new avatar
    } catch (error) {
      toast.error('Error updating avatar');
      console.error('Error:', error);
    }
  };

  const handlePresetAvatarSelect = async (avatarUrl) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl }
      });

      if (error) throw error;

      toast.success('Avatar updated successfully');
      window.location.reload(); // Refresh to show new avatar
    } catch (error) {
      toast.error('Error updating avatar');
      console.error('Error:', error);
    }
  };

  if (!user) {
    return (
      <Link to="/login">
        <Button variant="ghost" className="text-purple-300 hover:text-purple-200">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <User className="h-7 w-7 text-purple-300" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <Link to="/profile/decks">
          <DropdownMenuItem className="cursor-pointer">
            My Decks
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ImageIcon className="mr-2 h-4 w-4" />
            <span>Change Avatar</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="p-2">
              <div className="grid grid-cols-5 gap-2 mb-2">
                {PRESET_AVATARS.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-500"
                    onClick={() => handlePresetAvatarSelect(avatar)}
                  />
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="px-2 py-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAvatarChange(e.target.files?.[0])}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center gap-2 text-sm cursor-pointer hover:text-accent"
                >
                  <ImageIcon className="h-4 w-4" />
                  Upload custom
                </label>
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu; 
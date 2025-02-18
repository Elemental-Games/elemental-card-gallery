import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from 'lucide-react';

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

const ProfilePage = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.username || '');
      setAvatarUrl(user.user_metadata?.avatar_url || '');
    }
  }, [user]);

  const handleAvatarChange = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(publicUrl);
      toast.success('Avatar updated successfully');
    } catch (error) {
      toast.error('Error updating avatar');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { username },
        options: {
          data: { username }  // For metadata
        }
      });

      if (error) {
        throw error;
      }

      // Update display name in Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: username,  // This sets the display name
          username: username    // Keep metadata in sync
        }
      });

      if (updateError) {
        throw updateError;
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetAvatarSelect = async (avatarUrl) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl }
      });

      if (error) {
        throw error;
      }

      setAvatarUrl(avatarUrl);
      toast.success('Avatar updated successfully');
    } catch (error) {
      toast.error('Error updating avatar');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Profile - Elemental Games</title>
        <meta name="description" content="View and edit your Elemental Games profile" />
      </Helmet>

      <div className="min-h-screen bg-[#1A103C] py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-white mb-8">Profile</h1>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="decks">My Decks</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Avatar Card */}
                  <Card className="bg-purple-900/30 border-purple-500/30">
                    <CardHeader>
                      <h2 className="text-2xl font-semibold text-white">Avatar</h2>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-32 h-32">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt="Profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-purple-800 flex items-center justify-center">
                              <Upload className="w-8 h-8 text-purple-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                          <div className="grid grid-cols-5 gap-2 w-full">
                            {PRESET_AVATARS.map((avatar, index) => (
                              <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-500 object-cover transition-all duration-200"
                                onClick={() => handlePresetAvatarSelect(avatar)}
                              />
                            ))}
                          </div>
                          <div className="w-full">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              className="hidden"
                              id="avatar-upload"
                            />
                            <Label
                              htmlFor="avatar-upload"
                              className="cursor-pointer w-full"
                            >
                              <Button
                                variant="outline"
                                className="bg-purple-800/50 border-purple-500/30 w-full"
                                disabled={loading}
                              >
                                {loading ? 'Uploading...' : 'Upload Custom Avatar (Coming Soon)'}
                              </Button>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Profile Info Card */}
                  <Card className="bg-purple-900/30 border-purple-500/30">
                    <CardHeader>
                      <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-purple-200">Email</Label>
                          <Input
                            id="email"
                            value={user.email}
                            disabled
                            className="bg-purple-800/50 border-purple-500/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-purple-200">Username</Label>
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-purple-800/50 border-purple-500/30"
                          />
                        </div>
                        <Button
                          onClick={handleUpdateProfile}
                          disabled={loading}
                          className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="decks">
                <Card className="bg-purple-900/30 border-purple-500/30">
                  <CardHeader>
                    <h2 className="text-2xl font-semibold text-white">My Decks</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-purple-200 mb-4">Your saved decks will appear here</p>
                      <Button
                        onClick={() => window.location.href = '/cards/deck-builder'}
                        className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
                      >
                        Create New Deck
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage; 
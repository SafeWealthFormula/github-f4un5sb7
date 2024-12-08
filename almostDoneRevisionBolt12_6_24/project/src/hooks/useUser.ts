import { useState, useEffect } from 'react';
import { userService } from '../services/firestore/userService';
import type { UserDocument } from '../services/firestore/schemas';

export function useUser(userId: string) {
  const [user, setUser] = useState<UserDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userData = await userService.getUser(userId);
        setUser(userData);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error loading user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const updateProfile = async (profile: Partial<UserDocument['profile']>) => {
    if (!userId) return;

    setError(null);
    try {
      await userService.updateUserProfile(userId, profile);
      setUser(prev => prev ? { ...prev, profile: { ...prev.profile, ...profile } } : null);
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    }
  };

  return { user, isLoading, error, updateProfile };
}
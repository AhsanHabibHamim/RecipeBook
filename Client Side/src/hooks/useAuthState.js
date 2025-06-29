
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuthState() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setLoading(true);
        try {
          if (user) {
            // Get the user's ID token
            const idToken = await getIdToken(user, true);
            setToken(idToken);
          } else {
            setToken(null);
          }
          setUser(user);
        } catch (err) {
          console.error("Error getting user token:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Auth state change error:", error);
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return { user, token, loading, error };
}

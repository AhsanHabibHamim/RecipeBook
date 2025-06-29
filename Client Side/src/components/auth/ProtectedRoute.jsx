import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '@/hooks/useAuthState';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthState();
  const location = useLocation();
  const { toast } = useToast();

  // Always call hooks at the top, never inside if/else/return
  useEffect(() => {
    if (!user && !loading) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
    }
  }, [user, loading, toast]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;

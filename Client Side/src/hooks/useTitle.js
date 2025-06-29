
import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    
    // Cleanup function to reset the title when the component unmounts
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}


import { Link } from 'react-router-dom';
import { useTitle } from '@/hooks/useTitle';
import Lottie from 'lottie-react';
import notFoundAnimation from '@/assets/404-food.json';

const NotFound = () => {
  useTitle('RecipeBook - Page Not Found');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-recipe-cream">
      <div className="max-w-md w-full text-center">
        <div className="w-full max-w-sm mx-auto mb-8">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        
        <h1 className="text-4xl font-bold text-recipe-red mb-4">Oh No!</h1>
        <h2 className="text-2xl font-semibold text-recipe-orange mb-6">Recipe Not Found</h2>
        <p className="text-gray-800 mb-8">
          Looks like the recipe you're searching for has been gobbled up!
          Let's find you something delicious instead.
        </p>
        
        <Link 
          to="/"
          className="btn-primary inline-flex items-center px-8 py-3"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

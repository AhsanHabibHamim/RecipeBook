
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

const RecipeCard = ({ recipe }) => {
  // Set a default image if none is provided
  const imgSrc = recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  
  return (
    <div className="recipe-card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={imgSrc} 
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm py-1 px-2 rounded-full">
          <Heart size={16} className="text-recipe-red fill-recipe-red" />
          <span className="text-sm font-medium">{recipe.likes}</span>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-lg line-clamp-2">{recipe.title}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block bg-muted text-xs font-medium px-2 py-1 rounded">
            {recipe.cuisine}
          </span>
          <span className="inline-block bg-muted text-xs font-medium px-2 py-1 rounded">
            {recipe.preparationTime} min
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {recipe.description}
        </p>
        
        <div className="mt-auto">
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to={`/recipes/${recipe._id}`}
                  className="btn-primary w-full text-center block"
                >
                  See Details
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View full recipe details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

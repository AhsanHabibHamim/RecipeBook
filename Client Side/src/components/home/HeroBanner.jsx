
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const HeroBanner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[600px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          backgroundPosition: "center 60%"
        }}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover Delicious{' '}
            <span className="text-recipe-gold">
              <Typewriter
                words={['Recipes', 'Flavors', 'Dishes', 'Meals']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Find and share the best recipes from around the world. 
            Create your own cookbook and inspire others with your culinary creations.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/recipes')}
              className="btn-primary px-6 py-3 text-lg"
            >
              Explore Recipes
            </button>
            <button 
              onClick={() => navigate('/add-recipe')}
              className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium text-lg transition-colors"
            >
              Add Your Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

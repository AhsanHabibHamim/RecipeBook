
import { useNavigate } from 'react-router-dom';
import { Reveal } from 'react-awesome-reveal';

const CuisineCategories = () => {
  const navigate = useNavigate();
  
  const cuisines = [
    {
      name: 'Italian',
      image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      color: 'from-[#E44D26]/40 to-[#F16529]/40'
    },
    {
      name: 'Mexican',
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
      color: 'from-[#009245]/40 to-[#FCEE21]/40'
    },
    {
      name: 'Indian',
      image: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
      color: 'from-[#FF9933]/40 to-[#138808]/40'
    },
    {
      name: 'Japanese',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      color: 'from-[#BC002D]/40 to-[#FFFFFF]/10'
    },
    {
      name: 'American',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      color: 'from-[#3C3B6E]/40 to-[#B22234]/40'
    },
    {
      name: 'Thai',
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      color: 'from-[#FF0000]/40 to-[#0000FF]/40'
    }
  ];
  
  const handleCuisineClick = (cuisine) => {
    navigate(`/recipes?cuisine=${cuisine}`);
  };
  
  return (
    <div className="container-custom py-16">
      <Reveal triggerOnce>
        <h2 className="text-3xl font-bold mb-4 text-center">Popular Cuisines</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explore recipes from various culinary traditions around the world.
          Click on a cuisine to discover authentic and delicious recipes.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cuisines.map((cuisine, index) => (
            <div 
              key={index}
              onClick={() => handleCuisineClick(cuisine.name)}
              className="relative h-36 rounded-lg overflow-hidden cursor-pointer group"
            >
              <img 
                src={cuisine.image} 
                alt={cuisine.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${cuisine.color}`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-bold text-xl drop-shadow-md">{cuisine.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default CuisineCategories;

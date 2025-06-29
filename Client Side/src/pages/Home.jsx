
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';
import HowItWorks from '@/components/home/HowItWorks';
import CuisineCategories from '@/components/home/CuisineCategories';
import { useTitle } from '@/hooks/useTitle';
import GoAllRecipes from './GoAllRecipes';

const Home = () => {
  useTitle('RecipeBook - Home');
  
  return (
    <div>
      <HeroBanner />
      <FeaturedRecipes />
      <GoAllRecipes />
      <HowItWorks />
      <CuisineCategories />
    </div>
  );
};

export default Home;


import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-card mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-primary text-2xl">🍲</span>
              <span className="font-heading font-bold text-xl">RecipeBook</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Discover, share, and enjoy delicious recipes from around the world.
              Create your culinary masterpieces and share them with our community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/recipes" className="text-muted-foreground hover:text-primary transition-colors">All Recipes</Link></li>
              <li><Link to="/add-recipe" className="text-muted-foreground hover:text-primary transition-colors">Add Recipe</Link></li>
              <li><Link to="/my-recipes" className="text-muted-foreground hover:text-primary transition-colors">My Recipes</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Firmgate, Dhaka-1208, Bangladeh</p>
              <p className="mt-2">Email: hello_ahsan@recipebook.com</p>
              <p>Phone: (+880) 1993899080</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">&copy; {year} RecipeBook. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

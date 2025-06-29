
import { Utensils, Heart, BookOpen, Users } from 'lucide-react';
import { Reveal } from 'react-awesome-reveal';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Utensils className="w-12 h-12 text-recipe-orange" />,
      title: 'Create Recipes',
      description: 'Share your favorite recipes with detailed instructions and ingredients.'
    },
    {
      icon: <Heart className="w-12 h-12 text-recipe-red" />,
      title: 'Like & Save',
      description: 'Like recipes you enjoy and save them for later reference.'
    },
    {
      icon: <BookOpen className="w-12 h-12 text-recipe-green" />,
      title: 'Build Collection',
      description: 'Curate your own collection of recipes from around the world.'
    },
    {
      icon: <Users className="w-12 h-12 text-recipe-gold" />,
      title: 'Join Community',
      description: 'Connect with other food enthusiasts and share culinary tips.'
    }
  ];
  
  return (
    <div className="bg-muted py-16">
      <div className="container-custom">
        <Reveal triggerOnce cascade>
          <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform makes it easy to discover, create, and share amazing recipes.
            Follow these simple steps to get started.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default HowItWorks;

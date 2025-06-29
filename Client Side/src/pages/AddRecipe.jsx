
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/hooks/useAuthState';
import { getIdToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useTitle } from '@/hooks/useTitle';
import { Reveal } from 'react-awesome-reveal';
import { Plus, Minus } from 'lucide-react';

const AddRecipe = () => {
  useTitle('RecipeBook - Add Recipe');
  
  const { user } = useAuthState();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cuisine: '',
    preparationTime: '',
    ingredients: [''],
    instructions: [''],
    image: '',
    categories: []
  });
  
  const cuisines = [
    'Italian',
    'Mexican',
    'Indian',
    'Chinese',
    'Japanese',
    'Thai',
    'French',
    'American',
    'Mediterranean',
    'Greek',
    'Spanish',
    'Korean',
    'Vietnamese',
    'Other'
  ];
  
  const categoryOptions = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Snack',
    'Appetizer',
    'Soup',
    'Salad',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Low-Carb',
    'Keto',
    'Paleo'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };
  
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };
  
  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients];
      newIngredients.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };
  
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({
      ...prev,
      instructions: newInstructions
    }));
  };
  
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };
  
  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = [...formData.instructions];
      newInstructions.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        instructions: newInstructions
      }));
    }
  };
  
  const handleCategoryChange = (category) => {
    const updatedCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
      
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };
  
  const validateForm = () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Recipe title is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.cuisine) {
      toast({
        title: "Error",
        description: "Please select a cuisine type",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.preparationTime || isNaN(formData.preparationTime)) {
      toast({
        title: "Error",
        description: "Valid preparation time is required",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.ingredients.some(ing => !ing.trim())) {
      toast({
        title: "Error",
        description: "All ingredients must have a value",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.instructions.some(ins => !ins.trim())) {
      toast({
        title: "Error",
        description: "All instructions must have a value",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Filter out any empty strings
      const cleanedIngredients = formData.ingredients.filter(ing => ing.trim());
      const cleanedInstructions = formData.instructions.filter(ins => ins.trim());
      
      // Check if user is available before proceeding
      if (!user || !auth.currentUser) {
        toast({
          title: "Error",
          description: "You must be logged in to add a recipe",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      
      const recipeData = {
        ...formData,
        ingredients: cleanedIngredients,
        instructions: cleanedInstructions,
        userId: user.uid,
        authorName: user.displayName || 'Anonymous',
        likes: 0,
        createdAt: new Date().toISOString()
      };
      
      const token = await getIdToken(auth.currentUser);
      await api.recipes.create(recipeData, token);
      
      toast({
        title: "Recipe Added!",
        description: "Your recipe has been successfully created.",
      });
      
      navigate('/my-recipes');
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Protected route already handles redirection if user is not logged in
  if (!user) {
    return null;
  }
  
  return (
    <div className="container-custom py-12">
      <Reveal triggerOnce>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 recipe-card p-6">
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Recipe Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter recipe title"
                className="w-full p-2 rounded-md border border-input bg-background"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Briefly describe your recipe"
                className="w-full p-2 rounded-md border border-input bg-background resize-y min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cuisine" className="block font-medium mb-1">
                  Cuisine Type *
                </label>
                <select
                  id="cuisine"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-input bg-background"
                  required
                >
                  <option value="" disabled>Select cuisine</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="preparationTime" className="block font-medium mb-1">
                  Preparation Time (minutes) *
                </label>
                <input
                  id="preparationTime"
                  name="preparationTime"
                  type="number"
                  min="1"
                  value={formData.preparationTime}
                  onChange={handleInputChange}
                  placeholder="e.g. 30"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="image" className="block font-medium mb-1">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 rounded-md border border-input bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide a direct link to an image of your recipe
              </p>
            </div>
            
            <div>
              <label className="block font-medium mb-2">
                Categories (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categoryOptions.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-medium">
                  Ingredients *
                </label>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="text-accent flex items-center text-sm hover:underline"
                >
                  <Plus size={16} className="mr-1" /> Add Ingredient
                </button>
              </div>
              
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="flex-grow p-2 rounded-md border border-input bg-background mr-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-2 text-muted-foreground hover:text-destructive"
                    disabled={formData.ingredients.length === 1}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-medium">
                  Instructions *
                </label>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="text-accent flex items-center text-sm hover:underline"
                >
                  <Plus size={16} className="mr-1" /> Add Step
                </button>
              </div>
              
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start mb-3">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-2 flex-shrink-0">
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <textarea
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="flex-grow p-2 rounded-md border border-input bg-background resize-y min-h-[80px] mr-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="p-2 text-muted-foreground hover:text-destructive mt-1"
                    disabled={formData.instructions.length === 1}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Recipe...' : 'Add Recipe'}
              </button>
            </div>
          </form>
        </div>
      </Reveal>
    </div>
  );
};

export default AddRecipe;

import { useState, useEffect } from 'react';
import RecipeCard from '../recipes/RecipeCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Reveal } from 'react-awesome-reveal';

const FeaturedRecipes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['top'],
    queryFn: () => api.recipes.getTop(6),
  });
  
  const hasTopRecipes = Array.isArray(data) && data.length > 0;
  
  console.log('Top recipes data:', data);

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="recipe-card animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Recipes</h2>
        <div className="text-center text-muted-foreground">
          Failed to load recipes. Please try again later.
        </div>
      </div>
    );
  }
  
  // If no data yet, show placeholder recipes
  const recipes = data || [
    {
      _id: '1',
      title: 'Homemade Margherita Pizza',
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
      cuisine: 'Italian',
      preparationTime: 30,
      likes: 254,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      _id: '2',
      title: 'Thai Red Curry with Vegetables',
      description: 'Spicy and aromatic Thai curry with coconut milk and fresh vegetables.',
      cuisine: 'Thai',
      preparationTime: 45,
      likes: 187,
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      _id: '3',
      title: 'Classic French Croissants',
      description: 'Buttery, flaky pastry that\'s perfect for breakfast or brunch.',
      cuisine: 'French',
      preparationTime: 180,
      likes: 142,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1326&q=80'
    },
    {
      _id: '4',
      title: 'Mexican Street Tacos',
      description: 'Authentic street-style tacos with marinated meat and fresh toppings.',
      cuisine: 'Mexican',
      preparationTime: 40,
      likes: 219,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      _id: '5',
      title: 'Japanese Miso Ramen',
      description: 'Warming bowl of noodles in a rich miso broth with traditional toppings.',
      cuisine: 'Japanese',
      preparationTime: 60,
      likes: 176,
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1316&q=80'
    },
    {
      _id: '6',
      title: 'Greek Mediterranean Salad',
      description: 'Fresh and healthy salad with cucumbers, tomatoes, olives, and feta cheese.',
      cuisine: 'Greek',
      preparationTime: 15,
      likes: 128,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'
    }
  ];
  
  return (
    <div className="container-custom py-16">
      <Reveal triggerOnce cascade damping={0.1}>
        <h2 className="text-3xl font-bold mb-8 text-center">Top Recipes</h2>
        {!hasTopRecipes ? (
          <div className="text-center text-muted-foreground">
            No top recipes found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((recipe) => (
              <div key={recipe._id} className="animate-fade-in">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  );
};

export default FeaturedRecipes;

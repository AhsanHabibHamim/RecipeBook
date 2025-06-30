import React from 'react';
import AllRecipes from '../AllRecipes';

const AllItems = () => {
  return (
    <div className="container-custom py-12">
      {/* Reuse AllRecipes component for showing all items */}
      <AllRecipes />
    </div>
  );
};

export default AllItems;
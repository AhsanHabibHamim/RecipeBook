import MyRecipe from "../MyRecipe";

const MyItems = () => {
  return (
    <div className="container-custom py-12">
      {/* Show only user's recipes */}
      <MyRecipe />
    </div>
  );
};

export default MyItems;
import Ingredient from "./models/ingredient";
import Media from "./models/media";
import Recipe from "./models/recipe";
import RecipeCategory from "./models/recipeCategory";
import RecipeComposition from "./models/recipeComposition";
import RecipeStep from "./models/recipeStep";
import User from "./models/user";

// A Recipe belongs to a User (author) and a User can have many Recipes
Recipe.belongsTo(User, {
	foreignKey: "authorId",
	as: "Author",
	onDelete: "SET NULL",
});
User.hasMany(Recipe, {
	foreignKey: "authorId",
	as: "CreatedRecipes",
	onDelete: "SET NULL",
});

// A Recipe belongs to a Media (e.g., image) and a Media can be associated with many Recipes
Recipe.belongsTo(Media, {
	foreignKey: "mediaId",
	as: "Media",
	onDelete: "SET NULL",
});
Media.hasMany(Recipe, {
	foreignKey: "mediaId",
	as: "Recipes",
	onDelete: "SET NULL",
});

// A Recipe belongs to a RecipeCategory and a RecipeCategory can have many Recipes
Recipe.belongsTo(RecipeCategory, {
	foreignKey: "categoryId",
	as: "Category",
	onDelete: "SET NULL",
});
RecipeCategory.hasMany(Recipe, {
	foreignKey: "categoryId",
	as: "Recipes",
	onDelete: "SET NULL",
});

// A Recipe has many RecipeSteps and a RecipeStep belongs to a Recipe
Recipe.hasMany(RecipeStep, {
	foreignKey: "recipeId",
	as: "Steps",
	onDelete: "CASCADE",
});
RecipeStep.belongsTo(Recipe, {
	foreignKey: "recipeId",
	as: "Recipe",
	onDelete: "CASCADE",
});

// A Recipe has many RecipeCompositions and a RecipeComposition belongs to a Recipe
Recipe.hasMany(RecipeComposition, {
	foreignKey: "recipeId",
	as: "Compositions",
	onDelete: "CASCADE",
});
RecipeComposition.belongsTo(Recipe, {
	foreignKey: "recipeId",
	as: "Recipe",
	onDelete: "CASCADE",
});

// A RecipeComposition belongs to an Ingredient and an Ingredient can be part of many RecipeCompositions
RecipeComposition.belongsTo(Ingredient, {
	foreignKey: "ingredientId",
	as: "Ingredient",
	onDelete: "SET NULL",
});
Ingredient.hasMany(RecipeComposition, {
	foreignKey: "ingredientId",
	as: "Compositions",
	onDelete: "SET NULL",
});

export {
	Recipe,
	User,
	Media,
	RecipeCategory,
	RecipeStep,
	RecipeComposition,
	Ingredient,
};

import sequelize from ".";
import argon2 from "argon2";
import {
	Recipe,
	User,
	Media,
	RecipeCategory,
	Ingredient,
	RecipeComposition,
	RecipeStep,
} from "./association";

sequelize
	.authenticate()
	.then(async () => {
		console.log("Database connection has been established successfully.");
		await sequelize.sync({ force: false });
		seedDatabase()
			.then(() => {
				console.log("Database seeded successfully.");
			})
			.catch((error) => {
				console.error("Error seeding database:", error);
			});
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});

const CreateUsers = async () => {
	const users = [
		{
			id: 1,
			username: "john_doe",
			email: "john@doe.fr",
			password: await argon2.hash("johnEstVraimentUnSuperPseudo"),
			role: "admin",
		},
	];

	for (const user of users) {
		const [newUser, created] = await User.findOrCreate({
			where: { id: user.id },
			defaults: user,
		});
	}
};

const CreateIngredients = async () => {
	const ingredients = [
		{ id: 1, name: "Pâtes" },
    	{ id: 2, name: "Sauce tomate" },
    	{ id: 3, name: "Bœuf haché" },
    	{ id: 4, name: "Oignon" },
    	{ id: 5, name: "Ail" },
    	{ id: 6, name: "Huile d'olive" },
    	{ id: 7, name: "Sel" },
    	{ id: 8, name: "Poivre" },
    	{ id: 9, name: "Mozzarella" },
    	{ id: 10, name: "Basilic" },
    	{ id: 11, name: "Aubergine" },
    	{ id: 12, name: "Riz" },
    	{ id: 13, name: "Poulet" },
    	{ id: 14, name: "Nori" },
    	{ id: 15, name: "Saumon cru" },
    	{ id: 16, name: "Avocat" },
    	{ id: 17, name: "Œuf" },
    	{ id: 18, name: "Crème fraîche" },
    	{ id: 19, name: "Fromage râpé" },
    	{ id: 20, name: "Beurre" },
    	{ id: 21, name: "Lait" },
    	{ id: 22, name: "Chocolat" },
    	{ id: 23, name: "Miel" },
    	{ id: 24, name: "Cannelle" },
    	{ id: 25, name: "Farine" },
	];

	for (const ingredient of ingredients) {
		const [newIngredient, created] = await Ingredient.findOrCreate({
			where: { id: ingredient.id },
			defaults: ingredient,
		});
	}
};

const CreateRecipesComposition = async () => {
	const recipesComposition = [
		{ id: 1, recipeId: 1, ingredientId: 1, quantity: 200, unit: "grams" },
		{ id: 2, recipeId: 1, ingredientId: 2, quantity: 1, unit: "cup" },
		{ id: 3, recipeId: 1, ingredientId: 3, quantity: 300, unit: "grams" },
		{ id: 4, recipeId: 2, ingredientId: 20, quantity: 50, unit: "g" },
		{ id: 5, recipeId: 2, ingredientId: 17, quantity: 2, unit: "pièces" },
		{ id: 6, recipeId: 3, ingredientId: 18, quantity: 200, unit: "g" },
		{ id: 7, recipeId: 4, ingredientId: 12, quantity: 120, unit: "g" },
		{ id: 8, recipeId: 4, ingredientId: 15, quantity: 80, unit: "g" },
		{ id: 9, recipeId: 5, ingredientId: 21, quantity: 200, unit: "ml" },
		{ id: 10, recipeId: 5, ingredientId: 22, quantity: 50, unit: "g" },
		{ id: 11, recipeId: 5, ingredientId: 23, quantity: 1, unit: "cuillère" },
		{ id: 12, recipeId: 6, ingredientId: 22, quantity: 200, unit: "g" },
		{ id: 13, recipeId: 6, ingredientId: 25, quantity: 100, unit: "g" },
		{ id: 14, recipeId: 7, ingredientId: 25, quantity: 150, unit: "g" },
		{ id: 15, recipeId: 7, ingredientId: 17, quantity: 2, unit: "pièces" },
		{ id: 16, recipeId: 8, ingredientId: 21, quantity: 200, unit: "ml" },
		{ id: 17, recipeId: 8, ingredientId: 24, quantity: 1, unit: "pincée" },
	];

	for (const recipeComposition of recipesComposition) {
		const [newRecipeComposition, created] =
			await RecipeComposition.findOrCreate({
				where: { id: recipeComposition.id },
				defaults: recipeComposition,
			});
	}
};

const CreateMedias = async () => {
	const medias = [
		{ id: 1, title: "Ratatouille", coverImage: "https://picsum.photos/201", anecdote: "Un rat qui devient chef à Paris." },
		{ id: 2, title: "Les Simpson", coverImage: "https://picsum.photos/207", anecdote: "Notre famille préféré." },
	{ id: 3, title: "Friends", coverImage: "https://picsum.photos/208", anecdote: "Le meilleur groupe de pote." },
	{ id: 4, title: "Mon voisin Totoro", coverImage: "https://picsum.photos/205", anecdote: "Le voisin de nos rêves" },
	{ id: 5, title: "Le Parrain", coverImage: "https://picsum.photos/204", anecdote: "Le mafieu un peu dangereu." },
	{ id: 6, title: "Harry Potter", coverImage: "https://picsum.photos/206", anecdote: "Le sorcier presque parfait." },
	{ id: 7, title: "Charlie et la chocolaterie", coverImage: "https://picsum.photos/209", anecdote: "Un univers remplie de douceurs... Et de chocolat" },
	{ id: 8, title: "Amélie Poulain", coverImage: "https://picsum.photos/210", anecdote: "Madame Poulain et son fabuleux destin." },
	{ id: 9, title: "Sherlock Holmes", coverImage: "https://picsum.photos/211", anecdote: "Le détéctive privé très doué" },
	];

	for (const media of medias) {
		const [newMedia, created] = await Media.findOrCreate({
			where: { id: media.id },
			defaults: media,
		});
	}
};

const CreateRecipeCategories = async () => {
	const categories = [
		{
			id: 1,
			name: "Deserts",
		},
		{
			id: 2,
			name: "Entrées",
		},
		{
			id: 3,
			name: "Plats principaux",
		},
		{
			id: 4,
			name: "Boissons",
		},
	];

	for (const category of categories) {
		const [newCategory, created] = await RecipeCategory.findOrCreate({
			where: { id: category.id },
			defaults: category,
		});
	}
};

const CreateRecipes = async () => {
	const recipes = [
		{ id: 1, name: "Spaghetti Bolognese", coverImg: "https://picsum.photos/200", description: "Pâtes à la bolognaise classique.", authorId: 1, mediaId: 5, categoryId: 3, actif: true },
		{ id: 2, name: "Donuts d’Homer", coverImg: "https://picsum.photos/301", description: "Donuts roses sucrés.", authorId: 1, mediaId: 2, categoryId: 1, actif: true },
		{ id: 3, name: "Cheesecake à partager", coverImg: "https://picsum.photos/302", description: "Dessert moelleux comme chez Monica.", authorId: 1, mediaId: 3, categoryId: 1, actif: true },
		{ id: 4, name: "Bento japonais", coverImg: "https://picsum.photos/303", description: "Repas complet inspiré du Japon.", authorId: 1, mediaId: 4, categoryId: 3, actif: true },
		{ id: 5, name: "Chocolat chaud magique", coverImg: "https://picsum.photos/304", description: "Pour réchauffer un sorcier.", authorId: 1, mediaId: 6, categoryId: 4, actif: true },
		{ id: 6, name: "Fondant au chocolat", coverImg: "https://picsum.photos/305", description: "Gâteau fondant de Charlie.", authorId: 1, mediaId: 7, categoryId: 1, actif: true },
		{ id: 7, name: "Tarte au citron meringuée", coverImg: "https://picsum.photos/310", description: "Comme dans le Café des 2 Moulins.", authorId: 1, mediaId: 8, categoryId: 1, actif: true },
		{ id: 8, name: "Thé au lait à l’anglaise", coverImg: "https://picsum.photos/311", description: "Pour accompagner les enquêtes de Sherlock.", authorId: 1, mediaId: 9, categoryId: 4, actif: true },
	];

	for (const recipe of recipes) {
		const [recipeData, created] = await Recipe.findOrCreate({
			where: { id: recipe.id },
			defaults: recipe,
		});
	}
};

const CreateRecipesSteps = async () => {
	const recipeSteps = [
		{ id: 1, recipeId: 1, description: "Cuire les pâtes." },
		{ id: 2, recipeId: 1, description: "Faire revenir le bœuf et la sauce." },
		{ id: 3, recipeId: 2, description: "Préparer la pâte à donuts et frire." },
		{ id: 4, recipeId: 3, description: "Mélanger crème et fromage." },
		{ id: 5, recipeId: 4, description: "Assembler le bento." },
		{ id: 6, recipeId: 5, description: "Chauffer le lait avec le chocolat et le miel." },
		{ id: 7, recipeId: 6, description: "Préparer le fondant et le cuire à cœur." },
		{ id: 8, recipeId: 7, description: "Préparer la pâte et la crème citron." },
		{ id: 9, recipeId: 7, description: "Cuire la tarte et ajouter la meringue." },
		{ id: 10, recipeId: 8, description: "Faire infuser le thé puis ajouter le lait chaud." },
	];

	for (const step of recipeSteps) {
		const [newStep, created] = await RecipeStep.findOrCreate({
			where: { id: step.id },
			defaults: step,
		});
	}
};

const seedDatabase = async () => {
	await CreateUsers();
	await CreateMedias();
	await CreateIngredients();
	await CreateRecipeCategories();
	await CreateRecipes();
	await CreateRecipesComposition();
	await CreateRecipesSteps();
};

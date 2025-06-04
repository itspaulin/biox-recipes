import { Recipe } from '@/domain/recipe/enterprise/entities/recipe';

export class RecipesPresenter {
  static toHTTP(recipe: Recipe) {
    return {
      id: recipe.id.toString(),
      title: recipe.title,
      ingredients: recipe.ingredients,
      description: recipe.description,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }
}

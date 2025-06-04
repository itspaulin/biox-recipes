import { Recipe } from '../../enterprise/entities/recipe';

export abstract class RecipesRepository {
  abstract create(recipe: Recipe): Promise<void>;
  abstract getAllRecipes(): Promise<Recipe[]>;
  abstract getRecipeById(id: string): Promise<Recipe | null>;
  abstract getRecipeByTitle(title: string): Promise<Recipe | null>;
  abstract update(recipe: Recipe): Promise<Recipe>;
  abstract delete(id: string): Promise<void>;
}

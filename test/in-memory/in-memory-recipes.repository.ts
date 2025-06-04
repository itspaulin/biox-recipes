import { RecipesRepository } from '@/domain/recipe/application/repositories/recipe-repository.interface';
import { Recipe } from '@/domain/recipe/enterprise/entities/recipe';

export class InMemoryRecipesRepository implements RecipesRepository {
  public items: Recipe[] = [];

  async create(recipe: Recipe): Promise<void> {
    this.items.push(recipe);
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return this.items;
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    const recipe = this.items.find((item) => item.id.toString() === id);
    return recipe ?? null;
  }

  async getRecipeByTitle(title: string): Promise<Recipe | null> {
    const recipe = this.items.find((item) => item.title === title);
    return recipe ?? null;
  }
}

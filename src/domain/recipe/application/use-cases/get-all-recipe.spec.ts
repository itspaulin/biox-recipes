import { describe, it, expect, beforeEach } from 'vitest';
import { GetAllRecipeUseCase } from './get-all-recipes.usecase';
import { InMemoryRecipesRepository } from 'test/in-memory/in-memory-recipes.repository';
import { Recipe } from '../../enterprise/entities/recipe';

let inMemoryRecipesRepository: InMemoryRecipesRepository;
let sut: GetAllRecipeUseCase;

describe('Get All Recipes', () => {
  beforeEach(() => {
    inMemoryRecipesRepository = new InMemoryRecipesRepository();
    sut = new GetAllRecipeUseCase(inMemoryRecipesRepository);
  });

  it('should return all recipes', async () => {
    const recipe1 = Recipe.create({
      title: 'Bolo de cenoura',
      description: 'Top',
      ingredients: ['cenoura', 'farinha'],
    });

    const recipe2 = Recipe.create({
      title: 'Torta de maçã',
      description: 'Delícia',
      ingredients: ['maçã', 'massa'],
    });

    await inMemoryRecipesRepository.create(recipe1);
    await inMemoryRecipesRepository.create(recipe2);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.recipes).toHaveLength(2);
      expect(result.value.recipes[0]).toBeInstanceOf(Recipe);
      expect(result.value.recipes[1]).toBeInstanceOf(Recipe);
    }
  });
});

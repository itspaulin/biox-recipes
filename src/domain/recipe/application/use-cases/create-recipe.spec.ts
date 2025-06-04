import { describe, it, expect, beforeEach } from 'vitest';
import { CreateRecipeUseCase } from '@/domain/recipe/application/use-cases/create-recipe.usecase';
import { InMemoryRecipesRepository } from 'test/in-memory/in-memory-recipes.repository';

let inMemoryRecipesRepository: InMemoryRecipesRepository;
let sut: CreateRecipeUseCase;

describe('Create Recipe', () => {
  beforeEach(() => {
    inMemoryRecipesRepository = new InMemoryRecipesRepository();
    sut = new CreateRecipeUseCase(inMemoryRecipesRepository);
  });

  it('should be able to create a new recipe', async () => {
    const result = await sut.execute({
      title: 'Bolo de cenoura',
      description: 'Receita topzera',
      ingredients: ['cenoura', 'açúcar', 'farinha'],
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.recipe.id).toBeDefined();
      expect(result.value.recipe.title).toBe('Bolo de cenoura');
    }
  });

  it('should not allow duplicate recipe titles', async () => {
    await sut.execute({
      title: 'Bolo de cenoura',
      description: 'Receita 1',
      ingredients: ['cenoura', 'açúcar'],
    });

    const result = await sut.execute({
      title: 'Bolo de cenoura',
      description: 'Receita duplicada',
      ingredients: ['cenoura', 'farinha'],
    });

    expect(result.isLeft()).toBe(true);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { DeleteRecipeUseCase } from '@/domain/recipe/application/use-cases/delete-recipe.usecase';
import { InMemoryRecipesRepository } from 'test/in-memory/in-memory-recipes.repository';
import { makeRecipe } from 'test/factories/make-recipe';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

let inMemoryRecipesRepository: InMemoryRecipesRepository;
let sut: DeleteRecipeUseCase;

describe('Delete Recipe', () => {
  beforeEach(() => {
    inMemoryRecipesRepository = new InMemoryRecipesRepository();
    sut = new DeleteRecipeUseCase(inMemoryRecipesRepository);
  });

  it('should be able to delete a recipe', async () => {
    const recipe = makeRecipe({
      title: 'Bolo de cenoura',
      description: 'Receita topzera',
      ingredients: ['cenoura', 'açúcar', 'farinha'],
    });

    await inMemoryRecipesRepository.create(recipe);

    const result = await sut.execute({
      id: recipe.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeNull();

    // Verify the recipe was actually deleted
    const deletedRecipe = await inMemoryRecipesRepository.getRecipeById(
      recipe.id.toString(),
    );
    expect(deletedRecipe).toBeNull();
  });

  it('should not be able to delete a non-existent recipe', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to delete a recipe with invalid id', async () => {
    // Create a recipe first
    const recipe = makeRecipe({
      title: 'Bolo de chocolate',
      description: 'Delicioso bolo',
      ingredients: ['chocolate', 'farinha', 'ovos'],
    });

    await inMemoryRecipesRepository.create(recipe);

    // Try to delete with wrong id
    const result = await sut.execute({
      id: 'wrong-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);

    // Verify the original recipe still exists
    const existingRecipe = await inMemoryRecipesRepository.getRecipeById(
      recipe.id.toString(),
    );
    expect(existingRecipe).toBeTruthy();
    expect(existingRecipe?.title).toBe('Bolo de chocolate');
  });
});

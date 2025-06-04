import { describe, it, expect, beforeEach } from 'vitest';
import { UpdateRecipeUseCase } from './update-recipe.usecase';
import { InMemoryRecipesRepository } from 'test/in-memory/in-memory-recipes.repository';
import { Recipe } from '../../enterprise/entities/recipe';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

let inMemoryRecipesRepository: InMemoryRecipesRepository;
let sut: UpdateRecipeUseCase;

describe('Update Recipe', () => {
  beforeEach(() => {
    inMemoryRecipesRepository = new InMemoryRecipesRepository();
    sut = new UpdateRecipeUseCase(inMemoryRecipesRepository);
  });

  it('should be able to update a recipe', async () => {
    const recipe = Recipe.create({
      title: 'Feijão tropeiro',
      description: 'Do bom',
      ingredients: ['feijão', 'farinha', 'ovo'],
    });

    await inMemoryRecipesRepository.create(recipe);

    const result = await sut.execute({
      id: recipe.id.toString(),
      title: 'Feijão mineiro',
      ingredients: ['feijão', 'ovo'],
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.recipe.title).toBe('Feijão mineiro');
      expect(result.value.recipe.ingredients).toEqual(['feijão', 'ovo']);
      expect(result.value.recipe.description).toBe('Do bom');
    }
  });

  it('should return error if recipe does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      title: 'Qualquer',
    });

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { GetRecipeByIdUseCase } from './get-recipe-by-Id.usecase';
import { InMemoryRecipesRepository } from 'test/in-memory/in-memory-recipes.repository';
import { Recipe } from '../../enterprise/entities/recipe';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

let inMemoryRecipesRepository: InMemoryRecipesRepository;
let sut: GetRecipeByIdUseCase;

describe('Get Recipe By ID', () => {
  beforeEach(() => {
    inMemoryRecipesRepository = new InMemoryRecipesRepository();
    sut = new GetRecipeByIdUseCase(inMemoryRecipesRepository);
  });

  it('should return a recipe when given a valid ID', async () => {
    const recipe = Recipe.create({
      title: 'Pizza de calabresa',
      description: 'Sensacional',
      ingredients: ['massa', 'molho', 'calabresa'],
    });

    await inMemoryRecipesRepository.create(recipe);

    const result = await sut.execute({ recipeId: recipe.id.toString() });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.recipe.title).toBe('Pizza de calabresa');
    }
  });

  it('should return an error when recipe is not found', async () => {
    const result = await sut.execute({
      recipeId: new UniqueEntityId().toString(),
    });

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});

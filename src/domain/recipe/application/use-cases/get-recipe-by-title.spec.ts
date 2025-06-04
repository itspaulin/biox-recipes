import { describe, it, expect, beforeEach } from 'vitest';
import { GetRecipeByTitleUseCase } from './get-recipe-by-title.usecase';
import { InMemoryRecipesRepository } from 'test/in-memory/in-memory-recipes.repository';
import { Recipe } from '../../enterprise/entities/recipe';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

let inMemoryRecipesRepository: InMemoryRecipesRepository;
let sut: GetRecipeByTitleUseCase;

describe('Get Recipe By Title', () => {
  beforeEach(() => {
    inMemoryRecipesRepository = new InMemoryRecipesRepository();
    sut = new GetRecipeByTitleUseCase(inMemoryRecipesRepository);
  });

  it('should return a recipe when given a valid title', async () => {
    const recipe = Recipe.create({
      title: 'Cuscuz nordestino',
      description: 'Receita raiz',
      ingredients: ['milho', 'sal', 'água'],
    });

    await inMemoryRecipesRepository.create(recipe);

    const result = await sut.execute({ title: 'Cuscuz nordestino' });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.recipe.title).toBe('Cuscuz nordestino');
    }
  });

  it('should return an error when recipe with given title does not exist', async () => {
    const result = await sut.execute({ title: 'Receita que não existe' });

    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});

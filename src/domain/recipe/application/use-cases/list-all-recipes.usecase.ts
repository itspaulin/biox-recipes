import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipe-repository.interface';
import { Either, right } from 'src/core/either';
import { Recipe } from '../../enterprise/entities/recipe';

type ListAllRecipeUseCaseResponse = Either<
  null,
  {
    recipes: Recipe[];
  }
>;

@Injectable()
export class ListAllRecipeUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async execute(): Promise<ListAllRecipeUseCaseResponse> {
    const recipes = await this.recipesRepository.getAllRecipes();

    return right({
      recipes,
    });
  }
}

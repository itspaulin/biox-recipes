import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '../repositories/recipe-repository.interface';
import { Either, right } from 'src/core/either';
import { Recipe } from '../../enterprise/entities/recipe';

type GetAllRecipeUseCaseResponse = Either<
  null,
  {
    recipes: Recipe[];
  }
>;

@Injectable()
export class GetAllRecipeUseCase {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async execute(): Promise<GetAllRecipeUseCaseResponse> {
    const recipes = await this.recipesRepository.getAllRecipes();

    return right({
      recipes,
    });
  }
}

import { BadRequestException, Controller, Get } from '@nestjs/common';
import { GetAllRecipeUseCase } from '@/domain/recipe/application/use-cases/get-all-recipes.usecase';
import { RecipesPresenter } from '../presenters/recipe-presenter';

@Controller('/get-recipes')
export class GetAllRecipesController {
  constructor(private readonly getAllRecipes: GetAllRecipeUseCase) {}

  @Get()
  async handle() {
    const result = await this.getAllRecipes.execute();

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { recipes } = result.value;

    return {
      recipes: recipes.map(RecipesPresenter.toHTTP),
    };
  }
}

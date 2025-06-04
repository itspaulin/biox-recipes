import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { GetRecipeByIdUseCase } from '@/domain/recipe/application/use-cases/get-recipe-by-Id.usecase';
import { RecipesPresenter } from '../presenters/recipe-presenter';

@Controller('/get-recipe/:id')
export class GetRecipeByIdController {
  constructor(private readonly getRecipeById: GetRecipeByIdUseCase) {}

  @Get()
  async handle(@Param('id') recipeId: string) {
    const result = await this.getRecipeById.execute({ recipeId });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { recipe } = result.value;

    return RecipesPresenter.toHTTP(recipe);
  }
}

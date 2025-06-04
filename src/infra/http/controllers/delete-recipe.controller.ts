import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { DeleteRecipeUseCase } from '@/domain/recipe/application/use-cases/delete-recipe.usecase';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

@Controller('/delete-recipe/:id')
export class DeleteRecipeController {
  constructor(private readonly deleteRecipe: DeleteRecipeUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    const result = await this.deleteRecipe.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException('Recipe not found');
      }

      throw new BadRequestException();
    }
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validations.pipe';
import { z } from 'zod';
import { UpdateRecipeUseCase } from '@/domain/recipe/application/use-cases/update-recipe.usecase';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { RecipesPresenter } from '../presenters/recipe-presenter';

const updateRecipeBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
});

const bodyValidationPipe = new ZodValidationPipe(updateRecipeBodySchema);

type UpdateRecipeBodySchema = z.infer<typeof updateRecipeBodySchema>;

@Controller('/update-recipe')
export class UpdateRecipeController {
  constructor(private readonly updateRecipe: UpdateRecipeUseCase) {}

  @Put('/:id')
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: UpdateRecipeBodySchema,
    @Param('id') id: string,
  ) {
    const { title, description, ingredients } = body;

    const result = await this.updateRecipe.execute({
      id,
      title,
      description,
      ingredients,
    });

    if (result.isLeft()) {
      const error = result.value;

      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException('Recipe not found');
      }

      throw new BadRequestException();
    }

    const { recipe } = result.value;

    return {
      recipe: RecipesPresenter.toHTTP(recipe),
    };
  }
}

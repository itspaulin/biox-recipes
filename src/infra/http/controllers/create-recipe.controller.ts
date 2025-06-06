import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validations.pipe';
import { z } from 'zod';
import { CreateRecipeUseCase } from '@/domain/recipe/application/use-cases/create-recipe.usecase';
import { RecipesPresenter } from '../presenters/recipe-presenter';

const createRecipeBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
});

const bodyValidationPipe = new ZodValidationPipe(createRecipeBodySchema);

type CreateRecipeBodySchema = z.infer<typeof createRecipeBodySchema>;

@Controller('/create-recipe')
export class CreateRecipeController {
  constructor(private readonly createQuestion: CreateRecipeUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateRecipeBodySchema) {
    const { title, description, ingredients } = body;

    const result = await this.createQuestion.execute({
      title,
      description,
      ingredients,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { recipe } = result.value;

    return {
      recipe: RecipesPresenter.toHTTP(recipe),
    };
  }
}

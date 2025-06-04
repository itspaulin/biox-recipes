import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validations.pipe';
import { z } from 'zod';
import { CreateRecipeUseCase } from '@/domain/recipe/application/use-cases/create-recipe.usecase';

const createRecipeBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string().uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(createRecipeBodySchema);

type CreateRecipeBodySchema = z.infer<typeof createRecipeBodySchema>;

@Controller('/create-recipe')
export class CreateRecipeController {
  constructor(private readonly createQuestion: CreateRecipeUseCase) {}

  @Post()
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
  }
}

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';
import {
  Recipe,
  RecipeProps,
} from '@/domain/recipe/enterprise/entities/recipe';
import { PrismaRecipeMapper } from '@/infra/database/prisma/mappers/prisma-recipe-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makeRecipe(
  override: Partial<RecipeProps> = {},
  id?: UniqueEntityId,
): Recipe {
  const recipe = Recipe.create(
    {
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      ingredients: override.ingredients ?? [],
      ...override,
    },
    id,
  );

  return recipe;
}

@Injectable()
export class RecipeFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRecipe(data: Partial<RecipeProps> = {}): Promise<Recipe> {
    const recipe = makeRecipe(data);

    await this.prisma.recipe.create({
      data: PrismaRecipeMapper.toPrisma(recipe),
    });

    return recipe;
  }
}

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Recipe } from '@/domain/recipe/enterprise/entities/recipe';
import { Recipe as PrismaRecipe, Prisma } from '@prisma/client';

export class PrismaRecipeMapper {
  static toDomain(raw: PrismaRecipe): Recipe {
    return Recipe.create(
      {
        title: raw.title,
        description: raw.description,
        ingredients: raw.ingredients,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(recipe: Recipe): Prisma.RecipeUncheckedCreateInput {
    return {
      id: recipe.id.toString(),
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }
}

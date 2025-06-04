import { RecipesRepository } from '@/domain/recipe/application/repositories/recipe-repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Recipe } from '@/domain/recipe/enterprise/entities/recipe';
import { PrismaRecipeMapper } from '../mappers/prisma-recipe-mapper';

@Injectable()
export class PrismaRecipeRepository implements RecipesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(recipe: Recipe): Promise<void> {
    const data = PrismaRecipeMapper.toPrisma(recipe);

    await this.prisma.recipe.create({
      data,
    });
  }

  async getAllRecipes(): Promise<Recipe[]> {
    const recipes = await this.prisma.recipe.findMany();

    return recipes.map(PrismaRecipeMapper.toDomain);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });

    if (!recipe) {
      return null;
    }

    return PrismaRecipeMapper.toDomain(recipe);
  }

  async getRecipeByTitle(title: string): Promise<Recipe | null> {
    const recipe = await this.prisma.recipe.findFirst({ where: { title } });

    if (!recipe) {
      return null;
    }

    return PrismaRecipeMapper.toDomain(recipe);
  }

  async update(recipe: Recipe): Promise<Recipe> {
    const data = PrismaRecipeMapper.toPrisma(recipe);

    const updated = await this.prisma.recipe.update({
      where: { id: data.id },
      data,
    });

    return PrismaRecipeMapper.toDomain(updated);
  }
}

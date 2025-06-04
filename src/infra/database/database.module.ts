import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { RecipesRepository } from '@/domain/recipe/application/repositories/recipe-repository.interface'
import { PrismaRecipeRepository } from './prisma/repositories/prisma-recipes-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: RecipesRepository,
      useClass: PrismaRecipeRepository,
    },
  ],
  exports: [
    PrismaService,
    RecipesRepository,
  ],
})
export class DatabaseModule {}
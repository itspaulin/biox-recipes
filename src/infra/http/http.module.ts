import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateRecipeUseCase } from '@/domain/recipe/application/use-cases/create-recipe.usecase';
import { CreateRecipeController } from './controllers/create-recipe.controller';
import { GetAllRecipesController } from './controllers/get-all-recipes.controller';
import { GetAllRecipeUseCase } from '@/domain/recipe/application/use-cases/get-all-recipes.usecase';
import { GetRecipeByIdController } from './controllers/get-recipes-by-id.controller';
import { GetRecipeByIdUseCase } from '@/domain/recipe/application/use-cases/get-recipe-by-Id.usecase';
import { UpdateRecipeController } from './controllers/update-recipe.controller';
import { UpdateRecipeUseCase } from '@/domain/recipe/application/use-cases/update-recipe.usecase';
import { DeleteRecipeController } from './controllers/delete-recipe.controller';
import { DeleteRecipeUseCase } from '@/domain/recipe/application/use-cases/delete-recipe.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateRecipeController,
    UpdateRecipeController,
    DeleteRecipeController,
    GetAllRecipesController,
    GetRecipeByIdController,
  ],
  providers: [
    CreateRecipeUseCase,
    UpdateRecipeUseCase,
    DeleteRecipeUseCase,
    GetAllRecipeUseCase,
    GetRecipeByIdUseCase,
  ],
})
export class HttpModule {}

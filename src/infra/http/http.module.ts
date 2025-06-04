import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateRecipeUseCase } from '@/domain/recipe/application/use-cases/create-recipe.usecase';
import { CreateRecipeController } from './controllers/create-recipe.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateRecipeController],
  providers: [CreateRecipeUseCase],
})
export class HttpModule {}

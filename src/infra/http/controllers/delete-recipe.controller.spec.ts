import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { RecipeFactory } from 'test/factories/make-recipe';

describe('Delete Recipe (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let recipeFactory: RecipeFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipeFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    recipeFactory = moduleRef.get(RecipeFactory);
    prisma = moduleRef.get(PrismaService);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('[DELETE] /delete-recipe/:id - should delete an existing recipe', async () => {
    const recipe = await recipeFactory.makePrismaRecipe({
      title: 'Receita para Deletar',
      description: 'Esta receita será deletada',
      ingredients: ['ingredient1', 'ingredient2'],
    });

    const recipeInDB = await prisma.recipe.findUnique({
      where: { id: recipe.id.toString() },
    });

    const response = await request(app.getHttpServer())
      .delete(`/delete-recipe/${recipe.id.toString()}`)
      .send();

    expect(response.status).toBe(204);

    const recipeOnDB = await prisma.recipe.findUnique({
      where: { id: recipe.id.toString() },
    });

    expect(recipeOnDB).toBeNull();
  });
});

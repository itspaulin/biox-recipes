import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { RecipeFactory } from 'test/factories/make-recipe';

describe('Get All Recipes (E2E)', () => {
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

  test('[GET] /get-recipes - should return all recipes', async () => {
    await prisma.recipe.deleteMany();

    const recipe1 = await recipeFactory.makePrismaRecipe({
      title: 'Receita 1',
      description: 'Descrição 1',
      ingredients: [],
    });
    const recipe2 = await recipeFactory.makePrismaRecipe({
      title: 'Receita 2',
      description: 'Descrição 2',
      ingredients: [],
    });

    const response = await request(app.getHttpServer())
      .get('/get-recipes')
      .send();

    expect(response.status).toBe(200);

    // Valida o formato retornado, conforme RecipesPresenter.toHTTP
    expect(response.body.recipes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: recipe1.id.toString(),
          title: recipe1.title,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
        expect.objectContaining({
          id: recipe2.id.toString(),
          title: recipe2.title,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });
});

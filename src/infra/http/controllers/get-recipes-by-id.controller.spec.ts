import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { RecipeFactory } from 'test/factories/make-recipe';

describe('Get Recipe By ID (E2E)', () => {
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

  test('[GET] /get-recipe/:id - should return a recipe by id', async () => {
    const recipe = await recipeFactory.makePrismaRecipe({
      title: 'Receita para buscar',
      description: 'Descrição para busca',
      ingredients: [],
    });

    const response = await request(app.getHttpServer())
      .get(`/get-recipe/${recipe.id.toString()}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      id: recipe.id.toString(),
      title: recipe.title,
      ingredients: recipe.ingredients,
      description: recipe.description,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
    });
  });

  test('[GET] /get-recipe/:id - should return 400 if recipe not found', async () => {
    const invalidId = '00000000-0000-0000-0000-000000000000';

    const response = await request(app.getHttpServer())
      .get(`/get-recipe/${invalidId}`)
      .send();

    expect(response.status).toBe(400);
  });
});

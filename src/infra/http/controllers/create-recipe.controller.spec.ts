import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { RecipeFactory } from 'test/factories/make-recipe';

describe('Create Recipe (E2E)', () => {
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

  test('[POST] /create-recipe - should create a new recipe', async () => {
    const ingredient1 = await recipeFactory.makePrismaRecipe();
    const ingredient2 = await recipeFactory.makePrismaRecipe();

    const payload = {
      title: 'Receita de Teste',
      description: 'Descrição da receita de teste',
      ingredients: [ingredient1.id.toString(), ingredient2.id.toString()],
    };

    const response = await request(app.getHttpServer())
      .post('/create-recipe')
      .send(payload);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('recipe');
    expect(response.body.recipe).toHaveProperty('id');
    expect(response.body.recipe.title).toBe(payload.title);
    expect(response.body.recipe.description).toBe(payload.description);
    expect(response.body.recipe.ingredients).toEqual(payload.ingredients);
    expect(response.body.recipe).toHaveProperty('createdAt');
    expect(response.body.recipe).toHaveProperty('updatedAt');

    const recipeOnDB = await prisma.recipe.findFirst({
      where: { title: 'Receita de Teste' },
    });

    expect(recipeOnDB).toBeTruthy();
    expect(recipeOnDB?.description).toBe(payload.description);

    expect(recipeOnDB?.ingredients).toHaveLength(2);
    expect(recipeOnDB?.ingredients).toEqual(
      expect.arrayContaining(payload.ingredients),
    );
  });
});

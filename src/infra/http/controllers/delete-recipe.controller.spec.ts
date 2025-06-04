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

    const response = await request(app.getHttpServer())
      .delete(`/delete-recipe/${recipe.id.toString()}`)
      .send();

    expect(response.status).toBe(204);

    const recipeOnDB = await prisma.recipe.findUnique({
      where: { id: recipe.id.toString() },
    });

    expect(recipeOnDB).toBeNull();
  });

  test('[DELETE] /delete-recipe/:id - should return 404 when recipe does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    const response = await request(app.getHttpServer())
      .delete(`/delete-recipe/${nonExistentId}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Recipe not found');
  });

  test('[DELETE] /delete-recipe/:id - should return 404 when recipe id is invalid', async () => {
    const recipe = await recipeFactory.makePrismaRecipe({
      title: 'Receita Existente',
      description: 'Esta receita existe',
      ingredients: ['ingredient1'],
    });

    const invalidId = 'invalid-uuid-format';

    const response = await request(app.getHttpServer())
      .delete(`/delete-recipe/${invalidId}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Recipe not found');

    const recipeOnDB = await prisma.recipe.findUnique({
      where: { id: recipe.id.toString() },
    });

    expect(recipeOnDB).toBeTruthy();
    expect(recipeOnDB?.title).toBe('Receita Existente');
  });
});

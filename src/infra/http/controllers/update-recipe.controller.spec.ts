import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { RecipeFactory } from 'test/factories/make-recipe';

describe('Update Recipe (E2E)', () => {
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

  test('[PUT] /update-recipe/:id - should update an existing recipe', async () => {
    const existingRecipe = await recipeFactory.makePrismaRecipe({
      title: 'Receita Original',
      description: 'Descrição original',
      ingredients: ['ingredient-1', 'ingredient-2'],
    });

    const updatePayload = {
      title: 'Receita Atualizada',
      description: 'Descrição atualizada',
      ingredients: ['ingredient-3', 'ingredient-4', 'ingredient-5'],
    };

    const response = await request(app.getHttpServer())
      .put(`/update-recipe/${existingRecipe.id.toString()}`)
      .send(updatePayload);

    expect(response.status).toBe(204);

    const updatedRecipe = await prisma.recipe.findUnique({
      where: { id: existingRecipe.id.toString() },
    });

    expect(updatedRecipe).toBeTruthy();
    expect(updatedRecipe?.title).toBe(updatePayload.title);
    expect(updatedRecipe?.description).toBe(updatePayload.description);
    expect(updatedRecipe?.ingredients).toHaveLength(3);
    expect(updatedRecipe?.ingredients).toEqual(
      expect.arrayContaining(updatePayload.ingredients),
    );
  });

  test('[PUT] /update-recipe/:id - should update recipe with partial data', async () => {
    const existingRecipe = await recipeFactory.makePrismaRecipe({
      title: 'Receita Original',
      description: 'Descrição original',
      ingredients: ['ingredient-1', 'ingredient-2'],
    });

    const partialUpdatePayload = {
      title: 'Apenas Título Atualizado',
    };

    const response = await request(app.getHttpServer())
      .put(`/update-recipe/${existingRecipe.id.toString()}`)
      .send(partialUpdatePayload);

    expect(response.status).toBe(204);

    const updatedRecipe = await prisma.recipe.findUnique({
      where: { id: existingRecipe.id.toString() },
    });

    expect(updatedRecipe).toBeTruthy();
    expect(updatedRecipe?.title).toBe(partialUpdatePayload.title);
    expect(updatedRecipe?.description).toBe('Descrição original');
    expect(updatedRecipe?.ingredients).toEqual([
      'ingredient-1',
      'ingredient-2',
    ]);
  });

  test('[PUT] /update-recipe/:id - should return 404 when recipe does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    const updatePayload = {
      title: 'Receita Inexistente',
      description: 'Esta receita não existe',
      ingredients: ['ingredient-1'],
    };

    const response = await request(app.getHttpServer())
      .put(`/update-recipe/${nonExistentId}`)
      .send(updatePayload);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Recipe not found');
  });

  test('[PUT] /update-recipe/:id - should return 400 with invalid data', async () => {
    const existingRecipe = await recipeFactory.makePrismaRecipe();

    const invalidPayload = {
      title: 123,
      description: null,
      ingredients: 'not-an-array',
    };

    const response = await request(app.getHttpServer())
      .put(`/update-recipe/${existingRecipe.id.toString()}`)
      .send(invalidPayload);

    expect(response.status).toBe(400);
  });

  test('[PUT] /update-recipe/:id - should update recipe with empty optional fields', async () => {
    const existingRecipe = await recipeFactory.makePrismaRecipe({
      title: 'Receita Original',
      description: 'Descrição original',
      ingredients: ['ingredient-1', 'ingredient-2'],
    });

    const response = await request(app.getHttpServer())
      .put(`/update-recipe/${existingRecipe.id.toString()}`)
      .send({});

    expect(response.status).toBe(204);

    const unchangedRecipe = await prisma.recipe.findUnique({
      where: { id: existingRecipe.id.toString() },
    });

    expect(unchangedRecipe?.title).toBe('Receita Original');
    expect(unchangedRecipe?.description).toBe('Descrição original');
    expect(unchangedRecipe?.ingredients).toEqual([
      'ingredient-1',
      'ingredient-2',
    ]);
  });

  test('[PUT] /update-recipe/:id - should handle empty ingredients array', async () => {
    const existingRecipe = await recipeFactory.makePrismaRecipe({
      title: 'Receita Original',
      description: 'Descrição original',
      ingredients: ['ingredient-1', 'ingredient-2'],
    });

    const updatePayload = {
      title: 'Receita Sem Ingredientes',
      ingredients: [],
    };

    const response = await request(app.getHttpServer())
      .put(`/update-recipe/${existingRecipe.id.toString()}`)
      .send(updatePayload);

    expect(response.status).toBe(204);

    const updatedRecipe = await prisma.recipe.findUnique({
      where: { id: existingRecipe.id.toString() },
    });

    expect(updatedRecipe?.title).toBe(updatePayload.title);
    expect(updatedRecipe?.ingredients).toEqual([]);
  });
});

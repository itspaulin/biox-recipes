import { Optional } from 'src/core/@types/optional';
import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export interface RecipeProps {
  title: string;
  description: string;
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Recipe extends Entity<RecipeProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get ingredients() {
    return this.props.ingredients;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  set ingredients(ingredients: string[]) {
    this.props.ingredients = ingredients;
    this.touch();
  }

  static create(
    props: Optional<RecipeProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const recipe = new Recipe(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return recipe;
  }
}

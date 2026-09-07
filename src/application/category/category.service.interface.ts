import { Category } from "./category.model";

export abstract class ICategoryService {
  abstract createCategory(name: string): Promise<Category>
  abstract getCategoryById(id: number): Promise<Category>
  abstract getAllCategories(): Promise<Category[]>
}
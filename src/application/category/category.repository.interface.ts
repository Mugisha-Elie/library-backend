import type { Transaction } from "../../persistence/database-connection.interface";
import { Category } from "./category.model";

export abstract class ICategoryRepository {
  abstract findById(tx: Transaction, id: number): Promise<Category | null>
  abstract findByName(tx: Transaction, name: string): Promise<Category | null>
  abstract findAll(tx: Transaction): Promise<Category[]>
  abstract insert(tx: Transaction, name: string): Promise<Category>
}